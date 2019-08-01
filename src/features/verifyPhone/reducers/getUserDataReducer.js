import { GET_USER_DATA } from 'Redux/actionTypes';

const initialState = {
  user: {},
  status: {
    success: false,
    error: false,
  },
  errorMessage: '',
};

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER_DATA}_SUCCESS`:
      return {
        ...state,
        user: action.data,
        status: {
          success: true,
          error: false,
        },
        errorMessage: '',
      };

    case `${GET_USER_DATA}_ERROR`:
      return {
        ...state,
        user: {},
        status: {
          success: false,
          error: true,
        },
        errorMessage: action.data.message,
      };
    default: {
      return state;
    }
  }
};

export default getUserReducer;
