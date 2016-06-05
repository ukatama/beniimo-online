import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import React, { PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';
import { green500, yellow500 } from 'material-ui/styles/colors';

const LoginIcon = (props) => {
    const {
        user,
    } = props;

    const color = (Date.now() - user.get('timestamp')) < 3 * 60 * 1000
        ? green500
        : yellow500;

    const style = {
        color,
        display: 'block',
    };

    return user.login('login')
        ? <Person style={style} />
        : <PersonOutline style={style} />;
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
