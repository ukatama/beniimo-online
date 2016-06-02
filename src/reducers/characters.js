import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { SET } from '../actions/character';

export default handleActions({
    [SET]: (state, {payload}) => state.set(payload.url, payload.data),
}, new Map());
