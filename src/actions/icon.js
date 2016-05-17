import {createAction} from 'redux-actions';

const sync = () => ({server: true});

export const CREATE = 'ICON_CREATE';
export const create = createAction(CREATE, (icon) => icon, sync);

const removeMeta = (message) => () => ({
    title: 'Delete Icon',
    message,
    server: true,
});

export const REMOVE = 'ICON_REMOVE';
export const remove =
    createAction(REMOVE, (icon) => icon, removeMeta('Delete icon "${name}"'));

export const REMOVE_SELECTED = 'ICON_REMOVE_SELECTED';
export const removeSelected = createAction(
    REMOVE_SELECTED,
    (icons) => icons,
    removeMeta('Delete selected icons')
);

export const FETCH = 'ICON_FETCH';
export const fetch = createAction(FETCH, () => {}, sync);

export const LIST = 'ICON_LIST';
export const list = createAction(LIST, (icons) => icons);
