import {CREATED} from '../actions/room';
import {SET} from '../actions/route';
import {parse} from '../router/Parser';

const Redirects = {
    [CREATE]: (action) => action.room.id,
};

export default ({dispatch}) => (next) => (action) => {
    if (action.type === SET && !action.route) {
        const {
            path,
            ...nextAction,
        } = action;
        const abs = (path.charAt(0) === '/')
            ? path
            : `/${path}`;

        if (abs !== location.pathname) {
            history.pushState({}, 'Nekochat', abs);
        }

        const route = parse(abs);

        if (route.onEnter) route.onEnter(dispatch)(route.params);

        return next({
            ...nextAction,
            route,
        });
    } else if (action.type in Redirects) {
        setTimeout(
            () => dispatch(Route.set(Redirects[action.type](action)))
        );
    }

    return next(action);
};