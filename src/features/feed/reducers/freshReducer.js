import bukkaData from '../data/fresh.json';
import freshMilk from '../data/fresh-milk.json';
import freshGreen from '../data/fresh-green.json';
import freshVeggies from '../data/fresh-veggies.json';
import freshYogurt from '../data/fresh-yogurt.json';
import freshFruit from '../data/fresh-fruit.json';
import freshEggs from '../data/fresh-eggs.json';

const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [
      ...bukkaData,
      ...freshMilk,
      ...freshGreen,
      ...freshEggs,
      ...freshVeggies,
      ...freshYogurt,
      ...freshFruit
    ],
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
    case 'FRESH_BUKKA_SUCCESS':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          message: action.data.message,
          nearbyBukkas: [...action.data.nearByBukkas],
        },
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };

    case 'FRESH_BUKKA_ERROR':
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

