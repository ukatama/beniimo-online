import {
    push,
    CREATE,
    FETCH,
    REMOVE,
    BULK_REMOVE,
} from '../../actions/icon';
import { generateId } from '../../utility/id';
import { Icon } from '../models/icon';

export const icon = (client) => (next) => (action) => {
    switch (action.type) {
        case CREATE: {
            const id = generateId([
                client.user.id,
                action.name,
                action.mime,
                action.data,
            ].join());

            Icon
                .insert({
                    id,
                    user_id: client.user.id || null,
                    name: action.name || null,
                    type: action.mime || null,
                    data: action.file || null,
                })
                .then((icon) => client.emit(push([icon])))
                .catch((e) => client.logger.error(e));
            break;
        }
        case FETCH:
            Icon
                .findAll('user_id', client.user.id)
                .then((icons) => client.emit(push(icons)))
                .catch((e) => client.logger.error(e));
            break;
        case REMOVE:
            Icon
                .del({
                    id: action.id,
                    user_id: client.user.id,
                })
                .then(() => action.id)
                .catch((e) => client.logger.error(e));
            break;
        case BULK_REMOVE:
            action
                .icons
                .forEach(({id}) => {
                    Icon
                        .del({
                            id,
                            user_id: client.user.id,
                        })
                        .then(() => action.id)
                        .catch((e) => client.logger.error(e));
                });
            break;
    }

    return next(action);
};
