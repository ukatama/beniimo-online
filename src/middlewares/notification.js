import {template, transform} from 'lodash';
import {notify} from '../browser/notification';

export default ({getState}) => (next) => (action) => {
    if (!action.meta || !action.meta.notify) return next(action);

    const state = getState();
    if (state.dom.focused) return next(action);

    const message = transform(
        action.meta.notify,
        (result, value, key) => {
            result[ley] = template(value)({action, state});
        },
        {}
    );

    notify(message).then(
        (notification) => setTimeout(() => notification.close(), 5000)
    );

    return next(action);

};
