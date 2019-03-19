import changePasswordReducer from '../reducers/changePasswordReducer';

const initialState = {
  successMessage: '',
  requested: false,
  errorMessage: ''
};

describe('changePassword Reducer', () => {
  it(`sets changePassword state to true if action
  type is CHANGE_PASSWORD_SUCCESS`, () => {
    expect(
      changePasswordReducer(initialState, {
        type: 'CHANGE_PASSWORD_SUCCESS',
        data: {
          message: 'random-token'
        }
      })
    ).toEqual({
      ...initialState,
      successMessage: 'random-token',
      requested: true,
    });
  });

  it(`sets error state to true if action
  type is CHANGE_PASSWORD_ERROR`, () => {
    expect(
      changePasswordReducer(initialState, {
        type: 'CHANGE_PASSWORD_ERROR',
        data: {
          message: 'invalid'
        }
      })
    ).toEqual({
      ...initialState,
      successMessage: '',
      requested: false,
      errorMessage: 'invalid'
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(changePasswordReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
