import { SELECT_AUTH_FORM } from 'Redux/actionTypes';

const initialState = {
  type: 'Sign In',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SELECT_AUTH_FORM}_SUCCESS`:
      return {
        ...state,
        type: action.data,
      };

    default: {
      return state;
    }
  }
};
