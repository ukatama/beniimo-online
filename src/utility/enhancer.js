import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Pure render enhancer
 * @param{Component} ComposedComponent - Component to compose
 * @returns{Component} Wrapped comopnent
 */
export function pureRender(ComposedComponent) {
    return class PureRenferWrapper extends Component {
        static get displayName() {
            return `PureRenferWrapper@${ComposedComponent.displayName}`;
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
