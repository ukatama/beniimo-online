describe('middlewares', () => {
    describe('notification', () => {
        const {notify} = require('../../browser/notification');

        jest.unmock('../notification');
        const middleware = require('../notification').default;

        it('ignore actions without meta', () => {
            const getState = jest.fn();
            const next = jest.fn();
            const action = {type: 'TEST'};

            middleware({getState})(next)(action);

            expect(getState).not.toBeCalled();
            expect(next.mock.calls).toBe([[action]]);
        });

        it('notifies meta.notify', () => {
            const getState = jest.fn().mockReturnValue({
                dom: {focused: true},
                title: 'foobar',
            });
            const next = jest.fn();
            const action = {
                type: 'TEST',
                payload: {
                    data: {test: 1234},
                },
                meta: {
                    notify: {
                        title: '${state.title}',
                        body: 'Message with data: ${action.payload.data.test}',
                    },
                },
            };

            middleware({getState})(next)(action);

            expect(notify.mock.calls).toBe([[{
                title: 'foobar',
                body: 'Message with data: 1234',
            }]]);
            expect(next.mock.calls).toBe([[action]]);
        });

        it('ignore actions if window is not focused', () => {
            const getState = jest.fn().mockReturnValue({
                dom: {focused: false},
            });
            const next = jest.fn();
            const action = {
                type: 'TEST',
                payload: {
                    data: {test: 1234},
                },
                meta: {
                    notify: {
                        title: '${state.title}',
                        body: 'Message with data: ${action.payload.data.test}',
                    },
                },
            };

            middleware({getState})(next)(action);

            expect(notify.mock.calls).not.toBeCalled();
            expect(next.mock.calls).toBe([[action]]);
        });
    });
});
