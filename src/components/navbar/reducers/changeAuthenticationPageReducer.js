import { PRIMARY_NAV_AUTH } from 'Redux/actionTypes';

const initialState = {
  type: 'Sign In',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${PRIMARY_NAV_AUTH}_SUCCESS`:
      return {
        ...state,
        type: action.data,
      };

    default: {
      return state;
    }
  }
};
