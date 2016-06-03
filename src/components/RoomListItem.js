import FontIcon from 'material-ui/FontIcon';
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

const RoomListItem = (props) => {
    const {
        room,
        user,
        onRoute,
        onRemoveRoom,
    } = props;

    const path = `/${room.get('id')}`;

    return (
        <ListItem
            href={path}
            leftIcon={<RoomStatusIcons room={room} />}
            primaryText={room.get('title')}
            rightIconButton={<RoomActionMenu {...props} />}
            secondaryText={
                <span>
                    @{room.get('user_id')}
                    &nbsp;
                    <Timestamp timestamp={room.modified} />
                </span>
            }
            onTouchTap={(e) => onRoute(e, path)}
        />
    );
};
RoomListItem.propTypes = {
    room: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
    }).isRequired,
    user: IPropTypes.contains({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onRemoveRoom: PropTypes.func.isRequired,
    onRoute: PropTypes.func.isRequired,
};
export default pureRender(RoomListItem);
