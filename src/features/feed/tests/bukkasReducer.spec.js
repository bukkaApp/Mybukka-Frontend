import freshMilk from '../data/fresh-milk.json';

import bukkasReducer from '../reducers/bukkasReducer';

const bukkadefault = [
  ...freshMilk,
];

const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [],
    message: ''
  },
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

describe('FETCH BUKKAS Reducer', () => {
  it(`sets fetchedBukkas to true if action
  type is FETCH_BUKKAS_SUCCESS`, () => {
    expect(
      bukkasReducer(initialState, {
        type: 'FETCH_BUKKAS_SUCCESS',
        data: {
          message: 'success',
          nearByBukkas: bukkadefault
        }
      })
    ).toEqual({
      ...initialState,
      fetchedBukkas: {
        message: 'success',
        nearbyBukkas: bukkadefault
      },
      status: {
        fetchedBukkas: true,
        error: false
      }
    });
  });

  it(`sets error state to true if action
  type is FETCH_BUKKAS_ERROR`, () => {
    expect(
      bukkasReducer(initialState, {
        type: 'FETCH_BUKKAS_ERROR',
        data: {
          message: 'invalid'
        }
      })
    ).toEqual({
      ...initialState,
      fetchedBukkas: {
        nearbyBukkas: [],
        message: ''
      },
      status: {
        fetchedBukkas: false,
        error: true
      },
      errorMessage: 'invalid'
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(bukkasReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
