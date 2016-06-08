import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { findDOMNode } from 'react-dom';
import RoomActionMenu from './RoomActionMenu';
import RoomStatusIcons from './RoomStatusIcons';
import { Timestamp } from './Timestamp';
import { pureRender } from '../utility/enhancer';

const Style = {
    Button: {
        height: 'auto',
        textAlign: 'left',
        padding: 16,
        paddingRight: 0,
        width: '100%',
    },
    Flex: {
        alignItems: 'center',
        display: 'flex',
    },
    Spacer: {
        flex: '1 1 0',
    },
    Title: {
        alignItems: 'center',
        display: 'flex',
        lineHeight: '24px',
        flex: '1 1 0',
    },
    Tagline: {
        fontSize: '12px',
        lineHeight: '16px',
    },
};

const RoomListItem = (props) => {
    const {
        room,
        user,
        onRoute,
        onRemoveRoom,
    } = props;

    const path = `/${room.get('id')}`;

    const cancelClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <li>
            <div style={Style.Flex}>
                <FlatButton
                    href={path}
                    style={Style.Button}
                    onTouchTap={(e) => {
                        e.preventDefault();
                        onRoute(e, path);
                    }}
                >
                    <div style={Style.Flex}>
                        <div>
                            <div>{room.get('title')}</div>
                            <div style={Style.Tagline}>
                                @{room.get('user_id')}
                                &nbsp;
                                <Timestamp timestamp={room.modified} />
                            </div>
                        </div>
                        <div style={Style.Spacer} />
                        <RoomStatusIcons room={room} />
                    </div>
                </FlatButton>
                <RoomActionMenu {...props} />
            </div>
        </li>
    );
};
RoomListItem.propTypes = {
    room: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        modified: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
    }).isRequired,
    user: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveRoom: PropTypes.func.isRequired,
    onRoute: PropTypes.func.isRequired,
};
export default pureRender(RoomListItem);
