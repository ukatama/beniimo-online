import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';
import { green500, yellow500 } from 'material-ui/styles/colors';

const Style = {
    display: 'block',
};

const LoginIcon = (props) => {
    const {
        user,
    } = props;

    const color = (Date.now() - user.get('timestamp')) < 3 * 60 * 1000
        ? green500
        : yellow500;

    const Icon = user.get('login') ? Person : PersonOutline;

    return <Icon color={color} style={Style} />;
};
LoginIcon.propTypes = {
    user: IPropTypes.contains({
        login: PropTypes.bool.isRequired,
        timestamp: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
    }),
};
export default pureRender(LoginIcon);
