import _ from 'lodash';
import {
    create as createMessage,
    fetch as fetchMessage,
} from '../../actions/message';
import {
    create,
    fetch,
    update,
    join,
    list,
    userLeft,
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
import {
    joined,
} from '../../actions/user';
import { set } from '../../actions/route';
import {PASSWORD_INCORRECT, Room} from '../models/room';
import {generateId} from '../../utility/id';

const ID_LENGTH = 16;

export const room = (client) => (next) => (action) => {
    const {
        payload,
        type,
   } = action;

    switch (type) {
        case CREATE:
            Room
                .insert({
                    id: generateId((new Date()).getTime() + '')
                            .substr(0, ID_LENGTH),
                    title: payload.title || null,
                    password: payload.password || null,
                    user_id: client.user.id || null,
                })
                .then((room) => client.emit(create(room)))
                .catch((e) => client.logger.error(e));
            break;
        case JOIN:
            Room
                .join(payload.id, payload.password || null)
                .then((room) => {
                    client.join(room);
                    client.emit(join(room));
                    client.publish(join(client.user));
                    client.dispatch(fetchMessage());
                })
                .catch((e) => {
                    if (e === PASSWORD_INCORRECT) {
                        client.emit(set('/'));
                    }

                    return Promise.reject(e);
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
                    id: payload || null,
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
                    _(payload)
                        .pick(['title', 'password', 'state'])
                        .mapValues((a) => a === '' ? null : a)
                        .value()
                )
                .then((room) => {
                    client.emit(update(room));
                    client.publish(update(room));
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
                    { notes: payload || null },
                    true
                )
                .then((room) => {
                    client.emit(update(room));
                    client.publish(update(room));

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
