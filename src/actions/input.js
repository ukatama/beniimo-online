import {createAction} from 'redux-actions';

const sync = () => ({server: true});

export const START = 'INPUT_START';
export const start = createAction(START, (input) => input, sync);

export const END = 'INPUT_END';
export const end = createAction(END, (input) => input, sync);
