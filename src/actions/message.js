import {createAction} from 'redux-actions';

const sync = () => ({ sync: true });

export const CREATE = 'MESSAGE_CREATE';
export const create = createAction(CREATE, (msg) => msg, () => ({
    sync: true,
    sound: 'notice',
}));

export const UPDATE = 'MESSAGE_UPDATE';
export const update = createAction(UPDATE, (msg) => msg, sync);

export const FETCH = 'MESSAGE_FETCH';
export const fetch = createAction(FETCH, (minId = null) => minId, sync);

export const LIST = 'MESSAGE_LIST';
export const list = createAction(LIST, (msgs) => msgs);

export const OLD = 'MESSAGE_OLD';
export const old = createAction(OLD, (msgs) => msgs);
