import { connect } from 'react-redux';
import { open } from '../actions/dialog';
import { Lobby } from '../components/Lobby';
import { bindActions } from './utility';

export const LobbyContainer = connect(
    () => ({}),
    bindActions({
        open,
    })
)(Lobby);
