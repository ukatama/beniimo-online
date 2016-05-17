import {GET, set} from '../actions/character';
import config from '../browser/config';
import {get} from '../browser/xhr';

const timestamps = {};

export default ({dispatch}) => (next) => (action) => {
    if (action.type !== GET) return next(action);

    const url = action.payload;
    const timestamp = timestamps[url];
    if (timestamp && Date.now() - timestamp < config.characterTimeout) {
        return next(action);
    }

    timestamps[url] = Date.now();

    get(url)
        .then((data) => dispatch(set(url, data)))
        .catch((e) => {
            console.error(e);
            timestamps[url] = null;
        });

    return next(action);
};
