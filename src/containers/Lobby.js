import { connect } from 'react-redux';
import { open } from '../actions/dialog';
import Lobby from '../components/Lobby';
import { bindActions } from './utility';

export default connect(
    () => ({}),
    (dispatch) => ({
        onCreateRoom: () => dispatch(open('room-create')),
    })
)(Lobby);
