import { AUTHENTICATE_USER } from 'Redux/actionTypes';

const initialState = {
  user: {},
  status: {
    authenticated: false,
    error: false
  },
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AUTHENTICATE_USER}_SUCCESS`:
      return {
        ...state,
        user: action.data,
        status: {
          authenticated: true,
          error: false,
        },
        errorMessage: '',
      };

    case `${AUTHENTICATE_USER}_ERROR`:
      return {
        ...state,
        user: {},
        status: {
          authenticated: false,
          error: true,
        },
        errorMessage: action.data.message,
      };

    default: {
      return state;
    }
  }
};
