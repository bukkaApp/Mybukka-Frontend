import { DELETE_USER_ADDRESS, } from 'Redux/actionTypes';

const initialState = {
  deleted: false,
  message: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${DELETE_USER_ADDRESS}_SUCCESS`:
      return {
        ...state,
        deleted: action.deleted,
        message: action.data,
        errorMessage: ''
      };

    case `${DELETE_USER_ADDRESS}_ERROR`:
      return {
        ...state,
        deleted: false,
        message: {},
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
