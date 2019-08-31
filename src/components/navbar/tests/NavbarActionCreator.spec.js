import selectAuthForm from '../actionCreators/selectAuthForm';

describe('set nav Authentication type action creator', () => {
  it(`creates action with type SET DELIVERY MODE
  as well as mode in payload`, async () => {
    const store = mockStore({});

    const expectedActions = [
      {
        type: 'SELECT_AUTH_FORM_SUCCESS',
        data: 'Sign Up'
      }
    ];

    await store.dispatch(selectAuthForm('Sign Up'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
