import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';
import MessageForm from '../containers/MessageForm';

const MessageFormList = (props) => {
    const {
        names,
    } = props;

    return (
        <div>
            {
                names.map(
                    (name) => <MessageForm key={name.get('id')} name={name} />
                )
            }
        </div>
    );
};
MessageFormList.propTypes = {
    names: IPropTypes.orderedMap.isRequired,
};

export default pureRender(MessageFormList);
