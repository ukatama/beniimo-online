import _ from 'lodash';
import {fetch as fetchMessage} from '../../actions/MessageActions';
import {
    created,
    fetch,
    updated,
    joined,
    list,
    password,
    userLeft,
    userJoined,
    userList,
} from '../../actions/RoomActions';
import * as ROOM from '../../constants/RoomActions';
import {PASSWORD_INCORRECT, Room} from '../models/room';
import {generateId} from '../../utility/id';

const ID_LENGTH = 16;

export const room = (client) => (next) => (action) => {
    switch (action.type) {
        case ROOM.CREATE:
            Room
                .insert({
                    id: generateId((new Date()).getTime() + '')
                            .substr(0, ID_LENGTH),
                    title: action.title || null,
                    password: action.password || null,
                    user_id: client.user.id || null,
                })
                .then((room) => client.emit(created(room)));
            break;
        case ROOM.JOIN:
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
                });
            break;
        case ROOM.LEAVE:
            client.dispatch(fetch());
            client.publish(userLeft(client.user));
            client.leave();
            break;
        case ROOM.FETCH:
            Room
                .findAll()
                .then((rooms) => client.emit(list(rooms)));
            break;
        case ROOM.REMOVE:
            Room
                .del({
                    id: action.id || null,
                    user_id: client.user.id || null,
                })
                .then(() => {});
            break;
        case ROOM.UPDATE:
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
                });
            break;
        case ROOM.FETCH_USER:
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
    }

    return next(action);
};
