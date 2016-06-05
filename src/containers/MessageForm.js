import { open } from '../actions/dialog';
import { create as createMessage } from '../actions/message';
import { update } from '../actions/typing';
import { create, remove } from '../actions/name';
import { connect } from 'react-redux';
import MessageForm from '../components/MessageForm';

export default connect(
    ({ characters }, { name }) => ({
        characters,
        name,
    }),
    (dispatch) => ({
        onCreateName: (e, name) => dispatch(create(name)),
        onEditName: (e, name_id) => dispatch(open('name-edit', { name_id })),
        onRemoveName: (e, id) => dispatch(remove({ id })),
        onSendMessage: (e, message) => dispatch(createMessage(message)),
        onTyping: (e, name, message) => dispatch(update({ name, message })),
    })
)(MessageForm);
