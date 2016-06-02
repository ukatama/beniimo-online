import _ from 'lodash';
import {
    create as createMessage,
    fetch as fetchMessage,
} from '../../actions/message';
import {
    create,
    fetch,
    updated,
    joined,
    list,
    password,
    userLeft,
    userJoined,
    userList,
    CREATE,
    JOIN,
    LEAVE,
    FETCH,
    REMOVE,
    UPDATE,
    FETCH_USER,
    NOTES_UPDATE,
} from '../../actions/room';
import {PASSWORD_INCORRECT, Room} from '../models/room';
import {generateId} from '../../utility/id';

const ID_LENGTH = 16;

export const room = (client) => (next) => (action) => {
    switch (action.type) {
        case CREATE:
            Room
                .insert({
                    id: generateId((new Date()).getTime() + '')
                            .substr(0, ID_LENGTH),
                    title: action.title || null,
                    password: action.password || null,
                    user_id: client.user.id || null,
                })
                .then((room) => client.emit(create(room)))
                .catch((e) => client.logger.error(e));
            break;
        case JOIN:
            Room
                .join(action.id, action.password || null)
                .then((room) => {
                    client.join(room);
                    client.emit(joined(room));
                    client.publish(userJoined(client.user));
                    client.dispatch(fetchMessage());
                })
                .catch((e) => {
                    if (e === PASSWORD_INCORRECT) {
                        client.emit(password(action.id));
                    } else {
                        return Promise.reject(e);
                    }
                })
                .catch((e) => client.logger.error(e));
            break;
        case LEAVE:
            client.dispatch(fetch());
            client.publish(userLeft(client.user));
            client.leave();
            break;
        case FETCH:
            Room
                .findAll()
                .then((rooms) => client.emit(list(rooms)))
                .catch((e) => client.logger.error(e));
            break;
        case REMOVE:
            Room
                .del({
                    id: action.id || null,
                    user_id: client.user.id || null,
                })
                .then(() => {})
                .catch((e) => client.logger.error(e));
            break;
        case UPDATE:
            Room
                .update(
                    client.room.id,
                    client.user.id,
                    _(action)
                        .pick(['title', 'password', 'state'])
                        .mapValues((a) => a === '' ? null : a)
                        .value()
                )
                .then((room) => {
                    client.emit(updated(room));
                    client.publish(updated(room));
                })
                .catch((e) => client.logger.error(e));
            break;
        case FETCH_USER:
            if (!client.room) break;

            client.redis.hgetall(`${client.room_key}:users`, (err, obj) => {
                if (err) {
                    client.logger.error(err);

                    return;
                }

                client.emit(userList(
                    _(obj)
                        .values()
                        .map((json) => JSON.parse(json))
                        .orderBy(['login', 'timestamp'], ['desc', 'desc'])
                        .value()
                ));
            });
            break;

        case NOTES_UPDATE:
            if (!client.room) break;

            Room
                .update(
                    client.room.id,
                    client.user.id,
                    {notes: action.notes || null},
                    true
                )
                .then((room) => {
                    client.emit(updated(room));
                    client.publish(updated(room));

                    client.dispatch(createMessage({
                        name: 'NOTES',
                        message: JSON.stringify(room.notes
                            .split(/\r\n|\n/)
                            .map((line) => [{
                                type: 'notes',
                                text: line,
                            }])),
                    }));
                })
                .catch((e) => client.logger.error(e));
    }

    return next(action);
};
