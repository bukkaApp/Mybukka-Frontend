import populateAndFilterAmount from 'Utilities/populateAndFilterAmount';
import bukkaData from '../data/drinks.json';
import lessWine from '../data/less-wine.json';
import whiteWine from '../data/white-wine.json';
import redWine from '../data/red-wine.json';

const bukkadefault = [
  ...bukkaData,
  ...lessWine,
  ...whiteWine,
  ...redWine,
];

const tags = ['wine', 'beer'];

const initialState = {
  fetchedBukkas: {
    nearbyBukkas: populateAndFilterAmount(bukkadefault, tags),
    message: ''
  },
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const freshReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DRINK_BUKKA_SUCCESS':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          message: action.data.message,
          nearbyBukkas: populateAndFilterAmount(action.data.nearByBukkas, tags),
        },
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };

    case 'DRINK_BUKKA_ERROR':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          nearbyBukkas: []
        },
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.data.message,
      };

    default: {
      return state;
    }
  }
};

export default freshReducer;

