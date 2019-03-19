import validateTokenReducer from '../reducers/validateTokenReducer';

const initialState = {
  successMessage: '',
  requested: false,
  isValidUser: false,
  errorMessage: ''
};

describe('changePassword Reducer', () => {
  it(`sets changePassword state to true if action
  type is VALIDATE_USER_TOKEN_SUCCESS`, () => {
    expect(
      validateTokenReducer(initialState, {
        type: 'VALIDATE_USER_TOKEN_SUCCESS',
        data: {
          message: 'random-token'
        }
      })
    ).toEqual({
      ...initialState,
      successMessage: 'random-token',
      requested: true,
      isValidUser: true,
    });
  });

  it(`sets error state to true if action
  type is VALIDATE_USER_TOKEN_ERROR`, () => {
    expect(
      validateTokenReducer(initialState, {
        type: 'VALIDATE_USER_TOKEN_ERROR',
        data: {
          message: 'invalid'
        }
      })
    ).toEqual({
      ...initialState,
      successMessage: '',
      requested: true,
      isValidUser: false,
      errorMessage: 'invalid'
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(validateTokenReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
