import NavbarReducer from '../reducers/selectedAuthFormReducer';

const initialState = {
  type: 'Sign In'
};

describe('Authentication Reducer', () => {
  it(`sets authentication state to true if action
  type is AUTHENTICATE_USER_SUCCESS`, () => {
    expect(
      NavbarReducer(initialState, {
        type: 'SELECT_AUTH_FORM_SUCCESS',
        data: 'Sign Up'
      })
    ).toEqual({
      ...initialState,
      type: 'Sign Up'
    });
  });
});
