import { FETCH_USER_ORDER_HISTORY, } from 'Redux/actionTypes';
// import historyData from '../inputData.json';

const initialState = {
  status: {
    fetched: false,
    error: false,
  },
  orderHistory: {}, // historyData,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_USER_ORDER_HISTORY}_SUCCESS`:
      return {
        ...state,
        status: {
          ...state.status,
          fetched: true,
          error: false,
        },
        orderHistory: action.data,
        errorMessage: ''
      };

    case `${FETCH_USER_ORDER_HISTORY}_ERROR`:
      return {
        ...state,
        status: {
          ...state.status,
          fetched: true,
          error: true
        },
        orderHistory: [],
        errorMessage: action.data
      };

    default: {
      return state;
    }
  }
};
