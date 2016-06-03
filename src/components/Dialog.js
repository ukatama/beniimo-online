import IPropTypes from 'react-immutable-proptypes';
import React, { PropTypes } from 'react';
import { pureRender } from '../utility/enhancer';

const table = {};

/**
 * Register Component as Dialog type
 * @param{string} type - Type of dialog
 * @param{Component} Component - Component clas
 */
export function register(type, Component) {
    table[type] = Component;
}

const Dialog = (props) => {
    const {
        dialog,
        ...others,
    } = props;

    if (!dialog) return null;

    const Component = table[dialog.get('type')];

    return Component && <Component open dialog={dialog} {...others} />;
};
Dialog.propTypes = {
    dialog: IPropTypes.contains({
        type: PropTypes.string.isRequired,
    }),
};
export default pureRender(Dialog);
