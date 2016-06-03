import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Pure render enhancer
 * @param{Component} Component - Component
 * @returns{Component} Wrapped comopnent
 */
export function pureRender(Component) {
    return class PureWrapper extends React.Component {
        shouldComponentUpdate(...args) {
            return PureRenderMixin.shouldComponentUpdate.call(this, ...args);
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}
