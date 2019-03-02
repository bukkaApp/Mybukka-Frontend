import { SET_DELIVERY_MODE } from 'Redux/actionTypes';

const initialState = {
  mode: 'delivery',
};

const deliveryModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DELIVERY_MODE:
      return {
        mode: action.mode
      };

    default: {
      return state;
    }
  }
};

export default deliveryModeReducer;
