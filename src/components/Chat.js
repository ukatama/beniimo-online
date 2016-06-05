import { List } from 'immutable';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import React, { Component, PropTypes } from 'react';
import { FROM_HEIGHT } from '../components/MessageForm';
import {Notes} from '../containers/notes';
import ChatAppBar from '../containers/ChatAppBar';
import MessageList from '../containers/MessageList';
import ChatDrawer from '../containers/ChatDrawer';
import MessageFormList from '../containers/MessageFormList';
import { pureRender } from '../utility/enhancer';

const Style = {
    Container: {
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
};

// ToDo: document.title
const Chat = () => (
    <div style={Style.Container}>
        <div style={{ flex: "0 0 auto" }}>
            <ChatAppBar />
        </div>
        <div id="notification-anchor" />
        <div style={{flex: '0 0 auto', maxHeight: '160px'}}>
            <Notes />
        </div>
        <MessageList />
        <ChatDrawer />
        <MessageFormList />
    </div>
);
export default pureRender(Chat);
