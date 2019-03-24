import { DISPLAY_TRACKING, } from 'Redux/actionTypes';

const initialState = {
  show: false,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${DISPLAY_TRACKING}_OPEN`:
      return {
        ...state,
        show: true,
        status: action.data
      };

    case `${DISPLAY_TRACKING}_CLOSE`:
      return {
        ...state,
        show: false,
      };

    default: {
      return state;
    }
  }
};
