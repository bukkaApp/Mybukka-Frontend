import requestPassChanges from '../actionCreators/requestPassChanges';
import changePasswordAction from './__mocks__/changePasswordAction.json';

describe('changePassword action creator test suite', () => {
  beforeEach(() => moxios.install(axiosInstance));
  afterEach(() => moxios.uninstall(axiosInstance));

  it(`dispatches REQUEST_PASSWORD_CHANGE_LOADING, REQUEST_PASSWORD_CHANGE_SUCCESS
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
        type: 'REQUEST_PASSWORD_CHANGE_LOADING',
        status: true,
      },
      {
        type: 'REQUEST_PASSWORD_CHANGE_SUCCESS',
        data: changePasswordAction.success,
      },
      {
        type: 'REQUEST_PASSWORD_CHANGE_LOADING',
        status: false,
      },
    ];

    const store = mockStore({});
    await store.dispatch(requestPassChanges('/user/reset', {}));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });

  it(`dispatches REQUEST_PASSWORD_CHANGE_LOADING, REQUEST_PASSWORD_CHANGE_ERROR
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
        type: 'REQUEST_PASSWORD_CHANGE_LOADING',
        status: true,
      },
      {
        type: 'REQUEST_PASSWORD_CHANGE_LOADING',
        status: false,
      },
      {
        type: 'REQUEST_PASSWORD_CHANGE_ERROR',
        data: changePasswordAction.error,
      },
    ];

    const store = mockStore({});
    await store.dispatch(requestPassChanges('/user/reset', {}));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });
});
