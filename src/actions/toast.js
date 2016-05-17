import {createAction} from 'redux-actions';
import {genId} from '../utility/id';

export const CREATE = 'TOAST_CREATE';
export const create = createAction(CREATE, (toast) => ({
    ...toast,
    id: genId(),
}));

export const CLOSE = 'TOAST_CLOSE';
export const close = createAction(CLOSE, (toast) => toast);
