import IPropTypes from 'react-immutable-proptypes';
import React, { PropTypes } from 'react';
import lobby from '../containers/Lobby';
import { ChatContainer as chat } from '../containers/ChatContainer';
import { Guest as guest } from './guest';

const Handlers = {
    lobby,
    chat,
    guest,
};

const Router = ({ route }) => {
    const Handler = Handlers[route.get('route')] || 'div';

    return Handler
        ? <Handler {...route.get('params')} />
        : <div>Loading...</div>;
};
Router.propTypes = {
    route: IPropTypes.contains({
        params: PropTypes.object,
        route: PropTypes.string,
    }).isRequired,
};
export default Router;
