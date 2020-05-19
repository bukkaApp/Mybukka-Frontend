import changeAuthenticationPage from '../actionCreators/changeAuthenticationPage';

describe('set nav Authentication type action creator', () => {
  it(`creates action with type SET DELIVERY MODE
  as well as mode in payload`, async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'PRIMARY_NAV_AUTH_SUCCESS',
        data: 'Sign Up'
      }
    ];

    await store.dispatch(changeAuthenticationPage('Sign Up'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
