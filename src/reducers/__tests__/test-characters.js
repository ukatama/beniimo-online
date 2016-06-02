describe('reducers', () => {
    describe('character', () => {
        jest.autoMockOff();

        const { Map } = require('immutable');

        const { set } = require('../../actions/character');
        const reducer = require('../characters').default;

        let state;
        it('has state of empty Map initially', () => {
            state = reducer(undefined, { type: 'TEST_INIT' });
            expect(state).toBeImmutable();
            expect(state).isEmpty();
        });

        it('sets character with url', () => {
            const data = { data: 'data' };

            state = reducer(state, set('url', data));

            expect(state).toEqualImmutable(new Map({
                url: data,
            }));
        });
    });
});
