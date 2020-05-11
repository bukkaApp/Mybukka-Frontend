import { POST_USER_DATA } from 'Redux/actionTypes';

const initialState = {
  userUpdate: false,
  updatedUser: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${POST_USER_DATA}_SUCCESS`:
      return {
        ...state,
        userUpdate: true,
        updatedUser: action.data,
        errorMessage: ''
      };

    case `${POST_USER_DATA}_ERROR`:
      return {
        ...state,
        userUpdate: true,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
