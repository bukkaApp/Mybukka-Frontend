import { VALIDATE_USER_TOKEN, } from 'Redux/actionTypes';

const initialState = {
  isValidUser: false,
  requested: false,
  successMessage: '',
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${VALIDATE_USER_TOKEN}_SUCCESS`:
      return {
        ...state,
        isValidUser: true,
        requested: true,
        successMessage: action.data.message,
        errorMessage: ''
      };

    case `${VALIDATE_USER_TOKEN}_ERROR`:
      return {
        ...state,
        successMessage: '',
        requested: true,
        isValidUser: false,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
