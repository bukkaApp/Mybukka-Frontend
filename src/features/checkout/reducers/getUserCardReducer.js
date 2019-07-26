const initialState = {
  message: '',
  cards: [],
  errorMessage: '',
  status: {
    success: false,
    error: false,
  }
};

const saveUserCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_CARD_SUCCESS': {
      return {
        ...state,
        cards: action.data.userCard.card,
        message: action.data.message,
        errorMessage: '',
        status: {
          success: true,
          error: false,
        }
      };
    }

    case 'FETCH_USER_CARD_ERROR': {
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

