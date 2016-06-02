import createLogger from 'redux-logger';
import dialog from './dialog';
import dice from './dice';
import notification from './notification';
import router from './router';
import socket from './socket';
import toast from './toast';

const middlewares = [
    dialog,
    dice,
    notification,
    router,
    socket,
    toast,
];

if (localStorage.getItem('nekochat.debug')) {
    middlewares.push(createLogger());
}

export default middlewares;
