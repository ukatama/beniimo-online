import { createAction } from 'redux-actions';

export const sync = () => ({ sync: true });

export const CREATE = 'ROOM_CREATE';
export const create = createAction(CREATE, (room) => room, sync);

export const UPDATE = 'ROOM_UPDATE';
export const update = createAction(UPDATE, (room) => room, sync);

export const REMOVE = 'ROOM_REMOVE';
export const remove = createAction(REMOVE, (room) => room, sync);

export const FETCH = 'ROOM_FETCH';
export const fetch = createAction(FETCH, () => {}, sync);

export const LIST = 'ROOM_LIST';
export const list = createAction(LIST, (rooms) => rooms, sync);

export const JOIN = 'ROOM_JOIN';
export const join =  createAction(JOIN, (room) => room, sync);

export const LEAVE = 'ROOM_LEAVE';
export const leave = createAction(LEAVE, () => {}, sync);
