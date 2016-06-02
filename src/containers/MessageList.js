import { requestPast } from '../actions/message';
import { whisperTo } from '../actions/name';
import { connect } from 'react-redux';
import { MessageList as Component } from '../components/MessageList';
import { bindState, bindActions } from './utility';

export const MessageList = connect(
    bindState('...room', 'messageList', 'input'),
    bindActions({
        requestPast,
        whisperTo,
    })
)(Component);
