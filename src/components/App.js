import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Theme from '../browser/theme';
import Dialog from '../containers/Dialog';
import Router from '../containers/Router';

const muiTheme = getMuiTheme(Theme);

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="filled-container">
                    <Router />
                    <Dialog />
                </div>
            </MuiThemeProvider>
        );
    }
}
