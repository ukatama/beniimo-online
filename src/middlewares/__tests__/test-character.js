describe('middlewares', () => {
    describe('character', () => {
        jest.unmock('redux-actions');
        jest.unmock('redux-actions/lib/createAction');

        const xhr = require('../../browser/xhr');

        jest.setMock('../../browser/config', {
            default: {
                characterTimeout: 30 * 60 * 1000, 
            },
        });

        jest.unmock('../../actions/character');
        const {get, SET} = require('../../actions/character');

        jest.unmock('../character');
        const middleware = require('../character').default;

        it('fetches character by XHR', () => {
            const p = {
                then: (callback) => {
                    callback({
                        foo: 'foo',
                        bar: 'bar',
                    })
                    return p;
                },
                catch: () => {
                    return p;
                },
            };
            xhr.get.mockClear();
            xhr.get.mockReturnValue(p);

            const dispatch = jest.fn();
            const next = jest.fn();
            const action = get('url');

            middleware({dispatch})(next)(action);

            expect(next.mock.calls).toEqual([[action]]);
            expect(xhr.get.mock.calls).toEqual([['url']]);
            expect(dispatch.mock.calls).toEqual([[{
                type: SET,
                payload: {
                    url: 'url',
                    data: {
                        foo: 'foo',
                        bar: 'bar',
                    },
                },
            }]]);
        });

        it('caches', () => {
            xhr.get.mockClear();

            const dispatch = jest.fn();
            const next = jest.fn();
            const action = get('url');

            middleware({dispatch})(next)(action);
    
            expect(next.mock.calls).toEqual([[action]]);
            expect(xhr.get.mock.calls).toEqual([]);
        });

        it('does not cache if failed', () => {
            const p = {
                then: (callback) => {
                    return p;
                },
                catch: (callback) => {
                    callback('error');
                    return p;
                },
            };
            xhr.get.mockClear();
            xhr.get.mockReturnValue(p);

            const dispatch = jest.fn();
            const next = jest.fn();
            const action = get('another-url');

            middleware({dispatch})(next)(action);
    
            expect(next.mock.calls).toEqual([[action]]);
            expect(xhr.get.mock.calls).toEqual([['another-url']]);
            expect(dispatch.mock.calls).toEqual([]);

            next.mockClear();
            xhr.get.mockClear();
            xhr.get.mockReturnValue(p);

            middleware({dispatch})(next)(action);
    
            expect(next.mock.calls).toEqual([[action]]);
            expect(xhr.get.mock.calls).toEqual([['another-url']]);
            expect(dispatch.mock.calls).toEqual([]);
        });
    });
});
