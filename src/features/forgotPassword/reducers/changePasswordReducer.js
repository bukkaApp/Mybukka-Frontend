import { CHANGE_PASSWORD, } from 'Redux/actionTypes';

const initialState = {
  requested: false,
  successMessage: '',
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CHANGE_PASSWORD}_SUCCESS`:
      return {
        ...state,
        requested: true,
        successMessage: action.data.message,
        errorMessage: ''
      };

    case `${CHANGE_PASSWORD}_ERROR`:
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
