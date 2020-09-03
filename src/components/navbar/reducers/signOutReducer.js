import { UNAUTHENTICATE_USER } from 'Redux/actionTypes';

const initialState = {
  status: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UNAUTHENTICATE_USER}_SUCCESS`:
      return {
        ...state,
        status: action.data,
      };

    default: {
      return state;
    }
  }
};
