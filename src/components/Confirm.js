import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import React, { PropTypes } from 'react';
import { format } from '../utility/format';

export const Confirm = (props) => {
    const {
        confirmList,
        ok,
        cancel,
    } = props;
    const confirm = confirmList[0] || {};

    const actions = [
        <FlatButton primary
            key="ok"
            label="OK"
            onTouchTap={() => ok(confirm.id)}
        />,
        <FlatButton secondary
            key="cancel"
            label="Cancel"
            onTouchTap={() => cancel(confirm.id)}
        />,
    ];

    const message = confirm.message && format(confirm.message, confirm.next);

    return (
        <Dialog modal
            actions={actions}
            open={confirmList.length > 0}
            title={confirm.title}
        >
            {message}
        </Dialog>
    );
};
Confirm.propTypes = {
    confirmList: PropTypes.arrayOf(PropTypes.shape({
        message: PropTypes.string.isRequired,
    })).isRequired,
    ok: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};