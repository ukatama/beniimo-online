import { join, leave } from '../actions/room';

export const Routes = [
    {
        path: '/', route: 'lobby',
        onEnter: (dispatch) => () => dispatch(leave()),
    },
    {
        path: '/guest', route: 'guest',
    },
    {
        path: '/:roomId', route: 'chat',
        onEnter: (dispatch) => ({roomId}) => dispatch(join(roomId)),
    },
];
