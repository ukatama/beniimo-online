import { pick } from 'lodash';
import { fetch } from '../actions/message';
import { whisperTo } from '../actions/name';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { bindState, bindActions } from './utility';

export default connect(
    (state) => pick(state, [
        'messages',
        'rooms',
        'typings',
    ]),
    (dispatch) => ({
        onFetchLog: (minId) => dispatch(fetch(minId)),
    })
)(MessageList);
