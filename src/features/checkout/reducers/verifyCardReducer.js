const initialState = {
  message: '',
  transactionDetails: {},
  status: {
    success: false,
    error: false,
  }
};

const verifyCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFIED_CARD_TRANSACTION_SUCCESS': {
      return {
        ...state,
        transactionDetails: action.data,
        status: {
          success: true,
          error: false,
        }
      };
    }

    case 'VERIFIED_CARD_TRANSACTION_ERROR': {
      return {
        ...initialState,
        transactionDetails: action.data,
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

export default verifyCardReducer;

