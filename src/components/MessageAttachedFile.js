import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';

const MessageAttachedFile = (props) => {
    const {
        message,
    } = props;
    const file_id = message.get('file_id');

    if (!file_id) return null;

    return (
        <img src={`/file/${file_id}`} />
    );
};
MessageAttachedFile.propTypes = {
    message: IPropTypes.contains({
        file_id: PropTypes.string,
    }).isRequired,
};
export default pureRender(MessageAttachedFile);
