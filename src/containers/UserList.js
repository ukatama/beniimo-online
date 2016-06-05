import { connect } from 'react-redux';
import UserList from '../components/UserList';

export default connect(
    ({ users }) => ({ users })
)(UserList);
