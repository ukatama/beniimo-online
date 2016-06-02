describe('reducers', () => {
    describe('names', () => {
        jest.autoMockOff();

        jest.mock('../../utility/id');
        const { genId } = require('../../utility/id');

        jest.setMock('../../browser/user', {
            id: 'user',
            name: 'User',
        });

        const { fromJS, Map, OrderedMap } = require('immutable');

        const { create, update, remove } = require('../../actions/name');
        const reducer = require('../names').default;
        const { INITIAL_NAME_ID } = require('../names');

        const INITIAL_ITEM = [INITIAL_NAME_ID, new Map({
            id: INITIAL_NAME_ID,
            name: 'User',
        })];

        let state;
        it('is OrderedMap contains user name initially', () => {
            state = reducer(undefined, { type: 'INIT' });
            expect(state).toEqualImmutable(new OrderedMap([INITIAL_ITEM]));
        });

        it('creates new name', () => {
            genId
                .mockReturnValueOnce('id1')
                .mockReturnValueOnce('id2');

            state = reducer(state, create({
                name: 'Test',
            }));
            state = reducer(state, create({
                name: 'Test2',
            }));

            expect(state).toEqualImmutable(new OrderedMap([
                INITIAL_ITEM,
                ['id1', fromJS({
                    id: 'id1',
                    name: 'Test',
                })],
                ['id2', fromJS({
                    id: 'id2',
                    name: 'Test2',
                })],
            ]));
        });

        it('updates name', () => {
            state = reducer(state, update({
                id: 'id1',
                name: 'Test1',
            }));
            expect(state).toEqualImmutable(new OrderedMap([
                INITIAL_ITEM,
                ['id1', fromJS({
                    id: 'id1',
                    name: 'Test1',
                })],
                ['id2', fromJS({
                    id: 'id2',
                    name: 'Test2',
                })],
            ]));
        });

        it('removes name', () => {
            state = reducer(state, remove({ id: 'id2' }));
            expect(state).toEqualImmutable(new OrderedMap([
                INITIAL_ITEM,
                ['id1', fromJS({
                    id: 'id1',
                    name: 'Test1',
                })],
            ]));
        });
    });
});
