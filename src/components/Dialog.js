import IPropTypes from 'react-immutable-proptypes';
import React, { PropTypes } from 'react';
import { pureRender } from '../utility/enhancer';
import NameEditDialog from '../containers/NameEditDialog';

const table = {
    'name-edit': NameEditDialog,
};

const Dialog = (props) => {
    const {
        dialogs,
        onClose,
        ...others,
    } = props;

    const dialog = dialogs.first();
    const type = dialog && dialog.get('type');

    const elements = Object.keys(table)
        .map((key) => {
            const Component = table[key];
            const open = Boolean(dialog) && dialog.get('type') === key;

            return (
                <Component
                    {...others}
                    key={key}
                    dialog={open ? dialog : null}
                    open={open}
                    onClose={(e) => dialog && onClose(e, dialog.get('id'))}
                />
            );
        });

    return <div>{elements}</div>;
};
Dialog.propTypes = {
    dialog: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
};
export default pureRender(Dialog);
