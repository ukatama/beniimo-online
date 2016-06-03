import { connect } from 'react-redux';
import { ok, cancel, close } from '../actions/dialog';
import Dialog from '../components/Dialog';

export default connect(
    (state) => ({
        dialog: state.dialogs.first(),
    }),
    (dispatch) => ({
        onOK: (id) => dispatch(ok(id)),
        onCalcel: (id) => dispatch(cancel(id)),
        onClose: (id) => dispatch(close(id)),
    })
)(Dialog);
