import bukkaData from '../data/fresh.json';
import freshMilk from '../data/fresh-milk.json';
import freshGreen from '../data/fresh-green.json';
import freshVeggies from '../data/fresh-veggies.json';
import freshYogurt from '../data/fresh-yogurt.json';
import freshFruit from '../data/fresh-fruit.json';
import freshEggs from '../data/fresh-eggs.json';

import freshReducer from '../reducers/freshReducer';

const bukkadefault = [
  ...bukkaData,
  ...freshMilk,
  ...freshGreen,
  ...freshEggs,
  ...freshVeggies,
  ...freshYogurt,
  ...freshFruit
];

const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [...bukkadefault],
    message: ''
  },
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

describe('FRESH BUKKA Reducer', () => {
  it(`sets fetchedBukkas to true if action
  type is FRESH_BUKKA_SUCCESS`, () => {
    expect(
      freshReducer(initialState, {
        type: 'FRESH_BUKKA_SUCCESS',
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
  type is FRESH_BUKKA_ERROR`, () => {
    expect(
      freshReducer(initialState, {
        type: 'FRESH_BUKKA_ERROR',
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
    expect(freshReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
