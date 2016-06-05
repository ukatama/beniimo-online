import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';

const MessageNode = (props) => {
    const {
        node,
    } = props;

    return <span>{node.get('text')}</span>;
};
MessageNode.propTypes = {
    node: IPropTypes.contains({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
};
export default MessageNode;
