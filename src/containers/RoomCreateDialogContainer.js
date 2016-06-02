import { connect } from 'react-redux';
import { getDialog, close } from '../actions/dialog';
import { create } from '../actions/room';
import { RoomCreateDialog } from '../components/RoomCreateDialog';
import { bindActions } from './utility';

export const RoomCreateDialoggContainer = connect(
    (state) => ({
        open: !!getDialog(state, 'room-create'),
    }),
    bindActions({
        create,
        close: () => close('room-create'),
    })
)(RoomCreateDialog);
