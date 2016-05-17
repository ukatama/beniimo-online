import {createAction} from 'redux-actions';

export const GET = 'CHARACTER_GET';
export const get = createAction(GET, (url) => url);

export const SET = 'CHARACTER_SET';
export const set = createAction(SET, (url, data) => ({url, data}));

export const REMOVE = 'CHARACTER_REMOVE';
export const remove = createAction(REMOVE);
