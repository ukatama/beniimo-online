import {CREATE, create, close} from '../actions/toast';

export default ({dispatch}) => (next) => (action) => {
    if (action.type === CREATE) {
        const duration = action.payload.duration || 3000;
        setTimeout(() => dispatch(close(action.payload.id)), duration);
    }

    if (!action.meta || !action.meta.toast) {
        dispatch(create(action.meta.toast));
    }

    return next(action);
};
