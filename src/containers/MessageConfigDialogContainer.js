import { connect } from 'react-redux';
import { get as onCharacterRequested } from '../actions/character';
import { getDialog, close, open } from '../actions/dialog';
import {
    create as createIcon,
    fetch as fetchIcon,
    remove as removeIcon,
} from '../actions/icon';
import { update as updateForm } from '../actions/name';
import { create as onNotify } from '../actions/toast';
import { MessageConfigDialog } from '../components/MessageConfigDialog';
import { bindActions } from './utility';

export const MessageConfigDialogContainer = connect(
    (state) => {
        const {
            messageForm,
            iconList,
            user,
        } = state;

        const dialog = getDialog(state, 'message-config');
        const open = !!dialog;
        const form = open &&
            messageForm.find(({id}) => id === dialog.data) || {};

        return {
            characters: state.characters,
            iconList,
            form,
            open,
            user,
        };
    },
    bindActions({
        createIcon,
        fetchIcon,
        removeIcon,
        updateForm,
        onCharacterRequested,
        onEditIcon: () => open('icon-edit'),
        onNotify,
        close: () => close('message-config'),
    })
)(MessageConfigDialog);
