import { SET_CHECKOUT_MODE } from 'Redux/actionTypes';

const initialState = {
  mode: false,
};

const checkoutModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKOUT_MODE:
      return {
        mode: action.mode
      };

    default: {
      return state;
    }
  }
};

export default checkoutModeReducer;
