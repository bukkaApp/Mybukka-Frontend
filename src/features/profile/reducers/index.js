import {
  FETCH_USER_DATA,
  POST_USER_ADDRESS,
  POST_USER_DATA
} from 'Redux/actionTypes';

const initialState = {
  finishedRequest: false,
  userInfo: {},
  address: {},
  errorMessage: {
    userInfo: '',
    address: ''
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_USER_DATA}_SUCCESS`:
      return {
        ...state,
        finishedRequest: true,
        userInfo: action.data,
        errorMessage: {
          ...state.errorMessage.userInfo,
          userInfo: ''
        }
      };

    case `${POST_USER_ADDRESS}_SUCCESS`:
      return {
        ...state,
        finishedRequest: true,
        address: action.data,
        errorMessage: {
          ...state.errorMessage.address,
          address: ''
        }
      };

    case `${POST_USER_DATA}_SUCCESS`:
      return {
        ...state,
        finishedRequest: true,
        userInfo: action.data,
        errorMessage: {
          ...state.errorMessage,
          userInfo: ''
        }
      };

    case `${FETCH_USER_DATA}_ERROR`:
      return {
        ...state,
        finishedRequest: true,
        errorMessage: {
          ...state.errorMessage,
          userInfo: action.data.message
        }
      };

    case `${POST_USER_ADDRESS}_ERROR`:
      return {
        ...state,
        finishedRequest: true,
        errorMessage: {
          ...state.errorMessage,
          address: action.data.message
        }
      };

    case `${POST_USER_DATA}_ERROR`:
      return {
        ...state,
        finishedRequest: true,
        errorMessage: {
          ...state.errorMessage,
          userInfo: action.data.message
        }
      };

    default: {
      return state;
    }
  }
};
