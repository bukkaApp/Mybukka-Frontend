import populateAndFilterAmount from 'Utilities/populateAndFilterAmount';
import bukkaData from '../data/drinks.json';
import lessWine from '../data/less-wine.json';
import whiteWine from '../data/white-wine.json';
import redWine from '../data/red-wine.json';

import drinkReducer from '../reducers/drinkReducer';

const tags = ['wine', 'beer'];

const bukkadefault = [
  ...bukkaData,
  ...lessWine,
  ...whiteWine,
  ...redWine,
];

const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [
      ...populateAndFilterAmount(bukkadefault, tags),
    ],
    message: ''
  },
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

describe('DRINK BUKKA Reducer', () => {
  it(`sets fetchedBukkas state to true if action
  type is DRINK_BUKKA_SUCCESS`, () => {
    expect(
      drinkReducer(initialState, {
        type: 'DRINK_BUKKA_SUCCESS',
        data: {
          message: 'success',
          nearByBukkas: bukkadefault
        }
      })
    ).toEqual({
      ...initialState,
      fetchedBukkas: {
        message: 'success',
        nearbyBukkas: populateAndFilterAmount(bukkadefault, tags),
      },
      status: {
        fetchedBukkas: true,
        error: false
      }
    });
  });

  it(`sets error state to true if action
  type is DRINK_BUKKA_ERROR`, () => {
    expect(
      drinkReducer(initialState, {
        type: 'DRINK_BUKKA_ERROR',
        data: {
          message: 'invalid'
        }
      })
    ).toEqual({
      ...initialState,
      fetchedBukkas: {
        message: '',
        nearbyBukkas: []
      },
      status: {
        fetchedBukkas: false,
        error: true
      },
      errorMessage: 'invalid'
    });
  });

  it('returns initial state if action type is not handled', () => {
    expect(drinkReducer(initialState, { type: 'UNHANDLED' })).toEqual(
      initialState
    );
  });
});
