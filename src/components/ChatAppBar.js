import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';

const ChatAppBar = (props) => {
    const {
        room,
        onEditRoom,
        onOpenDrawer,
    } = props;

    return (
        <AppBar
            iconElementRight={<Settings />}
            title={room.get('title') || 'Nekochat'}
            onLeftIconButtonTouchTap={onOpenDrawer}
            onRightIconButtonTouchTap={onEditRoom}
        />
    );
};
ChatAppBar.propTypes = {
    room: IPropTypes.contains({
        title: PropTypes.string,
    }).isRequired,
    onEditRoom: PropTypes.func.isRequired,
    onOpenDrawer: PropTypes.func.isRequired,
};

export default pureRender(ChatAppBar);
