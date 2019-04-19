import authenticate from '../actionCreators/authenticate';
import authenticateAction from './__mocks__/authenticateAction.json';

describe('authenticate action creator test suite', () => {
  beforeEach(() => moxios.install(axiosInstance));
  afterEach(() => moxios.uninstall(axiosInstance));

  it(`dispatches AUTHENTICATE_USER_LOADING, AUTHENTICATE_USER_SUCCESS
  upon success response from server`, async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: authenticateAction.success,
      });
    });

    const returnedActions = [
      {
        type: 'AUTHENTICATE_USER_LOADING',
        status: true,
      },
      {
        type: 'AUTHENTICATE_USER_SUCCESS',
        data: authenticateAction.success,
      },
      {
        type: 'AUTHENTICATE_USER_LOADING',
        status: false,
      },
    ];

    const store = mockStore({});
    await store.dispatch(authenticate('/signup', {}));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });

  it(`dispatches AUTHENTICATE_USER_LOADING, AUTHENTICATE_USER_ERROR
  upon error response from server`, async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: authenticateAction.error,
      });
    });

    const returnedActions = [
      {
        type: 'AUTHENTICATE_USER_LOADING',
        status: true,
      },
      {
        type: 'AUTHENTICATE_USER_LOADING',
        status: false,
      },
      {
        type: 'AUTHENTICATE_USER_ERROR',
        data: authenticateAction.error,
      },
    ];

    const store = mockStore({});
    await store.dispatch(authenticate('/signup', {}));
    expect(store.getActions()).toEqual(returnedActions);
    done();
  });
});
