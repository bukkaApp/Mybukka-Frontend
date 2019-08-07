const initialState = {
  message: '',
  newPayment: {},
  errorMessage: '',
  status: {
    success: false,
    error: false,
  }
};

const saveUserCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_CARD_SUCCESS': {
      return {
        ...state,
        newPayment: action.data.data,
        message: action.data.message,
        errorMessage: '',
        status: {
          success: true,
          error: false,
        }
      };
    }

    case 'SAVE_USER_CARD_ERROR': {
      return {
        ...state,
        errorMessage: action.data.message,
        status: {
          success: false,
          error: true,
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default saveUserCardReducer;

