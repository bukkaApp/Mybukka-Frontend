import { POST_USER_ADDRESS, } from 'Redux/actionTypes';

const initialState = {
  posted: false,
  address: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${POST_USER_ADDRESS}_SUCCESS`:
      return {
        ...state,
        posted: true,
        address: action.data,
        errorMessage: ''
      };

    case `${POST_USER_ADDRESS}_ERROR`:
      return {
        ...state,
        posted: false,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
