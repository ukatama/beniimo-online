import {open, OK} from '../actions/dialog';

export default ({dispatch, getState}) => (next) => (action) => {
    if (action.type === OK) {
        const dialog = getState().dialogs.find(({id}) => id === action.payload);
        if (dialog && dialog.next) dispatch(dialog.next);
    }

    if (!action.meta || !action.meta.dialog) return next(action);

    const {
        dialog,
        ...meta,
    } = action.meta;

    return next(open({
        ...dialog,
        next: {
            ...action,
            meta,
        },
    }));
};
