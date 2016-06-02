jest.dontMock('react');
describe('MessageConfigDialog', () => {
    jest.autoMockOff();
    jest.dontMock('../MessageConfigDialog');
    require('../MessageConfigDialog');
});
