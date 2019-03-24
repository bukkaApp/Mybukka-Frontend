import changePassword from '../actionCreators/changePassword';
import changePasswordAction from './__mocks__/changePasswordAction.json';

describe('changePassword action creator test suite', () => {
  beforeEach(() => moxios.install(axiosInstance));
  afterEach(() => moxios.uninstall(axiosInstance));

  it(`dispatches CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_SUCCESS
  upon success response from server`, async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: changePasswordAction.success,
      });
    });

    const returnedActions = [
      {
        type: 'CHANGE_PASSWORD_LOADING',
        status: true,
      },
      {
        type: 'CHANGE_PASSWORD_SUCCESS',
        data: changePasswordAction.success,
      },
      {
        type: 'CHANGE_PASSWORD_LOADING',
        status: false,
      },
    ];

    const store = mockStore({});
    await store.dispatch(changePassword('/user/reset', {}));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });

  it(`dispatches CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_ERROR
  upon error response from server`, async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: changePasswordAction.error,
      });
    });

    const returnedActions = [
      {
        type: 'CHANGE_PASSWORD_LOADING',
        status: true,
      },
      {
        type: 'CHANGE_PASSWORD_LOADING',
        status: false,
      },
      {
        type: 'CHANGE_PASSWORD_ERROR',
        data: changePasswordAction.error,
      },
    ];

    const store = mockStore({});
    await store.dispatch(changePassword('/user/reset', {}, ''));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });
});
