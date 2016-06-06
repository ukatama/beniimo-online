/* eslint react/no-multi-comp: 0 */

import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const wrapperName = (ComposedComponent, name) => {
    const originalName =
        ComposedComponent.displayName || ComposedComponent.name;
    const displayName = `${name}@${originalName}`;
};

/**
 * Pure render enhancer
 * @param{Component} ComposedComponent - Component to compose
 * @returns{Component} Wrapped comopnent
 */
export function pureRender(ComposedComponent) {
    const displayName = wrapperName(ComposedComponent, 'PureRenferWrapper');

    return class PureRenferWrapper extends Component {
        static get displayName() {
            return displayName;
        }

        static get propTypes() {
            return ComposedComponent.propTypes;
        }

        shouldComponentUpdate(...args) {
            return PureRenderMixin.shouldComponentUpdate.call(this, ...args);
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
}

/**
 * Enhancer to utilize componentWillMount
 * @param{Component} ComposedComponent - Component to ComposedComponent
 * @param{function} callback - Callback function
 * @returns{Component} Wrapped component
 */
export function willMount(ComposedComponent, callback) {
    const displayName = wrapperName(ComposedComponent, 'WillMountWrapper');

    return class WillMountWrapper extends Component {
        static get displayName() {
            return displayName;
        }

        static get propTypes() {
            return ComposedComponent.propTypes;
        }

        componentWillMount() {
            return callback(this.props);
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    };
}
