import { FETCH_USER_DATA } from 'Redux/actionTypes';

const initialState = {
  finishedRequest: false,
  userInfo: {},
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_USER_DATA}_SUCCESS`:
      return {
        ...state,
        finishedRequest: true,
        userInfo: action.data,
        errorMessage: ''
      };

    case `${FETCH_USER_DATA}_ERROR`:
      return {
        ...state,
        finishedRequest: true,
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};
