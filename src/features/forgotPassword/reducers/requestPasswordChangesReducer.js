import { REQUEST_PASSWORD_CHANGE, } from 'Redux/actionTypes';

const initialState = {
  requested: false,
  successMessage: '',
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REQUEST_PASSWORD_CHANGE}_SUCCESS`:
      return {
        ...state,
        requested: true,
        successMessage: action.data.message,
        errorMessage: ''
      };

    case `${REQUEST_PASSWORD_CHANGE}_ERROR`:
      return {
        ...state,
        successMessage: '',
        requested: false,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
