import AuthenticationReducer from '../reducers';

const initialState = {
  user: {},
  status: {
    authenticated: false,
    error: false
  },
  errorMessage: ''
};

describe('Authentication Reducer', () => {
  it(`sets authentication state to true if action
  type is AUTHENTICATE_USER_SUCCESS`, () => {
    expect(
      AuthenticationReducer(initialState, {
        type: 'AUTHENTICATE_USER_SUCCESS',
        data: {
          token: 'random-token'
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        token: 'random-token'
      },
      status: {
        authenticated: true,
        error: false
      }
    });
  });

  it(`sets error state to true if action
  type is AUTHENTICATE_USER_ERROR`, () => {
    expect(
      AuthenticationReducer(initialState, {
        type: 'AUTHENTICATE_USER_ERROR',
        data: {
          message: 'invalid'
        }
      })
    ).toEqual({
      ...initialState,
      user: {},
      status: {
        authenticated: false,
        error: true
      },
      errorMessage: 'invalid'
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(AuthenticationReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
