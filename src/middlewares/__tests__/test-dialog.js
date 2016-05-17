describe('middlewares', () => {
    describe('confirm', () => {
        jest.unmock('redux-actions');
        jest.unmock('redux-actions/lib/createAction');

        jest.unmock('../../actions/dialog');
        const {OPEN, ok} = require('../../actions/dialog');

        jest.unmock('../dialog');
        const middleware = require('../dialog').default;

        it('opens dialog by meta.dialog', () => {
            const dispatch = jest.fn();
            const next = jest.fn();
            const action = {
                type: 'ANY_ACTION',
                payload: {some: 'data'},
                meta: {
                    confirm: {
                        type: 'confirm',
                        title: 'test confirm',
                        message: 'message',
                    },
                    another: 'meta',
                },
            };

            middleware({dispatch})(next)(action);
    
            expect(next.mock.calls).toEqual([[{
                type: OPEN,
                payload: {
                    title: 'test confirm',
                    message: 'message',
                    next: {
                        type: 'ANY_ACTION',
                        payload: {some: 'data'},
                        meta: {another: 'meta'},
                    },
                },
            }]]);
            expect(dispatch.mock.calls).toEqual([]);
        });

        it('dispatches next action by OK', () => {
            const nextAction = {
                type: 'NEXT_ACTION',
                payload: {some: 'data'},
                meta: {meta: 'data'},
            };
            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({
                dialog: [
                    {
                        id: 'another-id',
                        next: {},
                    },
                    {
                        id: 'id',
                        next: nextAction,
                    },
                ],
            });
            const next = jest.fn();
            const action = ok('id');

            middleware({dispatch, getState})(next)(action);

            expect(next.mock.calls).toEqual([[action]]);
            expect(dispatch.mock.calls).toEqual([[nextAction]]);
        });
    });
});
