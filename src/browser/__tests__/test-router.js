describe('router', () => {
    jest.autoMockOff();
    jest.dontMock('redux');
    jest.dontMock('../router');

    window.localStorage = {
        getItem: jest.fn(),
    };

    require('../router');
});
