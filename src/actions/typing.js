import { createAction } from 'redux-actions';

const sync = () => ({ server: true });

export const UPDATE = 'TYPING_UPDATE';
export const update =
    createAction(UPDATE, (name, message) => ({ name, message }), sync);
