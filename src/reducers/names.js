import { Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import { CREATE, UPDATE, REMOVE } from '../actions/name';
import User from '../browser/user';

export const INITIAL_NAME_ID = 'DEFAULT';
const INITIAL_NAME = new Map({ id: INITIAL_NAME_ID, name: User.name });
const INITIAL_STATE = new OrderedMap([[INITIAL_NAME_ID, INITIAL_NAME]]);

export default handleActions({
    [CREATE]: (state, { payload }) => state.set(payload.id, new Map(payload)),
    [UPDATE]: (state, { payload }) => state.set(payload.id, new Map(payload)),
    [REMOVE]: (state, { payload }) => {
        if (state.size > 1) return state.delete(payload.id);

        return INITIAL_STATE;
    },
}, INITIAL_STATE);
