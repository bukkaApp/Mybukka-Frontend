import { SEND_VERIFACTION_CODE } from 'Redux/actionTypes';

const initialState = {
  status: {
    success: false,
    error: false,
  },
  errorMessage: '',
};

const sendVerificationCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SEND_VERIFACTION_CODE}_SUCCESS`:
      return {
        ...state,
        status: {
          success: true,
          error: false,
        },
        errorMessage: '',
      };

    case `${SEND_VERIFACTION_CODE}_ERROR`:
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

export default sendVerificationCodeReducer;
