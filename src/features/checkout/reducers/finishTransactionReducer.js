const initialState = {
  message: '',
  newPayment: {},
  status: {
    success: false,
    error: false,
  }
};

const finishTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FINISH_CHARGE_TRANSACTION_SUCCESS': {
      return {
        ...state,
        newPayment: action.data.newPayment,
        status: {
          success: true,
          error: false,
        }
      };
    }

    case 'FINISH_CHARGE_TRANSACTION_ERROR': {
      return {
        ...initialState,
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

export default finishTransactionReducer;
