import NavbarReducer from '../reducers/navbarAuthReducer';

const initialState = {
  type: 'Sign In'
};

describe('Authentication Reducer', () => {
  it(`sets authentication state to true if action
  type is AUTHENTICATE_USER_SUCCESS`, () => {
    expect(
      NavbarReducer(initialState, {
        type: 'PRIMARY_NAV_AUTH_SUCCESS',
        data: 'Sign Up'
      })
    ).toEqual({
      ...initialState,
      type: 'Sign Up'
    });
  });
});
