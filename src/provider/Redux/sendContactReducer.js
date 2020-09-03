import { SEND_CONTACT } from 'Redux/actionTypes';

const initialState = {
  status: {
    success: false,
    error: false,
  },
  errorMessage: '',
};

const sendContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SEND_CONTACT}_SUCCESS`:
      return {
        ...state,
        status: {
          success: true,
          error: false,
        },
        errorMessage: '',
      };

    case `${SEND_CONTACT}_ERROR`:
      return {
        ...state,
        status: {
          success: false,
          error: true,
        },
        errorMessage: action.data.message,
      };
    default: {
      return state;
    }
  }
};

export default sendContactReducer;
