import {connect} from 'react-redux';
import { open } from '../actions/dialog';
import Memo from '../components/Memo';

export default connect(
    ({ room }) => ({
        memo: room && room.get('memo'),
    })
)(Memo);
