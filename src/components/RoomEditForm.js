import { pick } from 'lodash';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { pureRender } from '../utility/enhancer';

const roomToState = (room) => ({
    title: room.get('title'),
    password: room.get('password') ? 'password' : null,
    passwordChanged: false,
    state: room.get('state'),
});

export default class RoomEditForm extends Component {
    static get propTypes() {
        return {
            room: IPropTypes.contains({
                title: PropTypes.string.isRequired,
                password: PropTypes.bool.isRequired,
                state: PropTypes.string.isRequired,
            }).isRequired,
            onUpdateRoom: PropTypes.func.isRequired,
        };
    }

    constructor(props) {
        super(props);

        const {
            room,
        } = props;

        this.state = roomToState(room);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.room !== this.props.room) {
            this.setState(roomToState(nextProps.room));
        }
    }

    get data() {
        const {
            title,
            password,
            passwordChanged,
            state,
        } = this.state;

        return {
            title,
            password: passwordChanged ? password : undefined,
            state,
        };
    }

    render() {
        const {
            title,
            password,
            state,
            onUpdateRoom,
        } = this.state;

        const handleSubmit = (e) => {
            e.preventDefault();
            onUpdateRoom(e, this.data);
        };

        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    isRequired
                    floatingLabelText="Title"
                    name="title"
                    value={title}
                    onChange={(e, title) => this.setState({ title })}
                />
                <TextField
                    fullWidth
                    isRequired
                    floatingLabelText="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={
                        (e, password) => this.setState({
                            password,
                            passwordChanged: true,
                        })
                    }
                />
                <RadioButtonGroup
                    name="state"
                    valueSelected={state}
                    onChange={(e, state) => this.setState({ state })}
                >
                    <RadioButton
                        label="Open"
                        value="open"
                    />
                    <RadioButton
                        label="Close"
                        value="close"
                    />
                </RadioButtonGroup>
            </form>
        );
    }
}
