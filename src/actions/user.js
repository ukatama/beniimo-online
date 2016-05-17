import {createAction} from 'redux-actions';

export const JOINED = 'USER_JOINED';
export const joined = createAction(JOINED, (user) => user);

export const LEFT = 'USER_LEFT';
export const left = createAction(LEFT, (user) => user);

export const FETCH = 'USER_FETCH';
export const fetch = createAction(FETCH);

export const LIST = 'USER_LIST';
export const list = createAction(LIST, (users) => users);
