import io from 'socket.io-client';
import { connect, disconnect } from '../actions/socket';
import Store from './store';

export const socket = io.connect();

socket.on('connect', () => Store.dispatch(connect()));
socket.on('disconnect', () => Store.dispatch(disconnect()));
socket.on('action', (action) => Store.dispatch(action));
