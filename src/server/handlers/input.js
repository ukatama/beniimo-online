import {
    begin,
    end,
    BEGIN,
    END,
} from '../../actions/typing';

export const input = (client) => (next) => (action) => {
    switch (action.type) {
        case BEGIN: {
            client.publish(begin({
                id: client.socket.id,
                user_id: client.user.id,
                name: action.name,
                message: action.message,
            }));
            client.touch();
            break;
        }
        case END: {
            client.publish(end({
                id: client.socket.id,
                user_id: client.user.id,
                name: action.name,
            }));
            client.touch();
            break;
        }
    }

    return next(action);
};
