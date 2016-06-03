import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import React, { PropTypes } from 'react';
import RoomList from '../containers/RoomList';

const Lobby = ({ onCreateRoom }) => {
    document.title = "Nekochat";

    const Style = {
        Container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            WebkitOverflowScrolling: 'touch',
        },
        RoomList: {
            flex: '1 1 auto',
            overflow: 'auto',
        },
    };

    return (
        <div style={Style.Container}>
            <AppBar
                iconElementLeft={
                    <a href="/">
                        <img src="/img/nekokoro48.png" />
                    </a>
                }
                iconElementRight={
                    <IconButton
                        iconClassName="material-icons"
                        onTouchTap={() => onCreateRoom()}
                    >
                        add
                    </IconButton>
                }
                title="Nekochat"
            />
            <div id="notification-anchor" />
            <RoomList style={Style.RoomList} />
        </div>
    );
};
Lobby.propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
};
export default Lobby;
