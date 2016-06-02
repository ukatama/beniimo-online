import { connect } from 'react-redux';
import { open } from '../actions/dialog';
import {
    leave, fetch,
    create as createRoom,
    remove as removeRoom,
} from '../actions/room';
import { set as setRoute } from '../actions/route';
import { RoomList } from '../components/RoomList';
import { bindActions } from './utility';


export const RoomListContainer = connect(
    (state) => ({
        rooms: state.roomList,
        user: state.user,
    }),
    (dispatch) => ({
        ...bindActions({
            open,
            leave,
            fetch,
            createRoom,
            removeRoom,
            setRoute,
        })(dispatch),
        onJoin: (id) => dispatch(setRoute(`/${id}`)),
    })
)(RoomList);
