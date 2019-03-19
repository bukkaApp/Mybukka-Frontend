import requestPasswordChangesReducer from '../reducers/requestPasswordChangesReducer';

const initialState = {
  successMessage: '',
  requested: false,
  errorMessage: ''
};

describe('requestPasswordChanges Reducer', () => {
  it(`sets requestPasswordChanges state to true if action
  type is REQUEST_PASSWORD_CHANGE_SUCCESS`, () => {
    expect(
      requestPasswordChangesReducer(initialState, {
        type: 'REQUEST_PASSWORD_CHANGE_SUCCESS',
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
  type is REQUEST_PASSWORD_CHANGE_ERROR`, () => {
    expect(
      requestPasswordChangesReducer(initialState, {
        type: 'REQUEST_PASSWORD_CHANGE_ERROR',
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
    expect(requestPasswordChangesReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
