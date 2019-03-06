import { FETCH_USER_DATA, FETCH_USER_ADDRESS } from 'Redux/actionTypes';

const initialState = {
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
        userInfo: action.data,
        errorMessage: {
          ...state.errorMessage.user,
          userInfo: ''
        }
      };

    case `${FETCH_USER_ADDRESS}_SUCCESS`:
      return {
        ...state,
        address: action.data,
        errorMessage: {
          ...state.errorMessage.address,
          address: ''
        }
      };

    case `${FETCH_USER_DATA}_ERROR`:
      return {
        ...state,
        userInfo: action.data,
        errorMessage: {
          ...state.errorMessage.user,
          userInfo: action.data.message
        }
      };

    case `${FETCH_USER_ADDRESS}_ERROR`:
      return {
        ...state,
        address: action.data,
        errorMessage: {
          ...state.errorMessage.address,
          address: action.data.message
        }
      };

    default: {
      return state;
    }
  }
};
