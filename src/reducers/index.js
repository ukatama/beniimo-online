import { combineReducers } from 'redux';
import characters from './characters.js';
import dialogs from './dialogs.js';
import dom from './dom.js';
import icons from './icons.js';
import index from './index.js';
import messages from './messages.js';
import names from './names.js';
import room from './room.js';
import rooms from './rooms.js';
import route from './route.js';
import toasts from './toasts.js';
import typings from './typings.js';
import users from './users.js';

export default combineReducers({
    characters,
    dialogs,
    dom,
    icons,
    index,
    messages,
    names,
    room,
    rooms,
    route,
    toasts,
    typings,
    users,
});
