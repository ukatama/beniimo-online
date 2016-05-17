describe('middlewares', () => {
    describe('debugger', () => {
        jest.setMock('../../browser/config', {
            debug: true,
        });

        jest.unmock('../debugger');
        const middleware = require('../debugger').default;

        it('prints debug log', () => {
            console.log = jest.fn();
            const getState = jest.fn();
            const next = jest.fn();
            const action = {type: 'ACTION'};

            middleware({getState})(next)(action);

            expect(console.log).toBeCalled();
            expect(getState).toBeCalled();
            expect(next).toBeCalledWith(action);
        });

        it('can be turned off by window.redux_debug', () => {
            console.log = jest.fn();
            const getState = jest.fn();
            const next = jest.fn();
            const action = {type: 'ACTION'};

            window.redux_debug = false;

            middleware({getState})(next)(action);

            expect(console.log).not.toBeCalled();
            expect(getState).not.toBeCalled();
            expect(next).toBeCalledWith(action);
        });
    });
});
