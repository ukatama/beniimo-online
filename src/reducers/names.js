import { Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';
import { CREATE, UPDATE, REMOVE } from '../actions/name';
import User from '../browser/user';

export const INITIAL_NAME_ID = 'DEFAULT';
const INITIAL_NAME = new Map({ id: INITIAL_NAME_ID, name: User.name });

export default handleActions({
    [CREATE]: (state, { payload }) => state.set(payload.id, new Map(payload)),
    [UPDATE]: (state, { payload }) => state.set(payload.id, new Map(payload)),
    [REMOVE]: (state, { payload }) => state.delete(payload.id),
}, new OrderedMap([[INITIAL_NAME_ID, INITIAL_NAME]]));
