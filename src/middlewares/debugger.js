import config from '../browser/config';

window.redux_debug = config.debug;

export default ({getState}) => (next) => (action) => {
    // eslint-disable-next-line no-console
    if (window.redux_debug) console.log(action.type, action, getState());

    return next(action);
};
