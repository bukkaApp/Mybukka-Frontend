import { FETCH_USER_ADDRESS, } from 'Redux/actionTypes';

const initialState = {
  address: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_USER_ADDRESS}_SUCCESS`:
      return {
        ...state,
        address: action.data,
        errorMessage: ''
      };

    case `${FETCH_USER_ADDRESS}_ERROR`:
      return {
        ...state,
        address: {},
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
