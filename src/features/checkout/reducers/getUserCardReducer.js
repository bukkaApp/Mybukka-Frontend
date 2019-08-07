const initialState = {
  message: '',
  hasDefaultCard: false,
  cards: [],
  errorMessage: '',
  status: {
    success: false,
    error: false,
  }
};

const checkDefaultCard = (data) => {
  if (Array.isArray(data)) {
    return data.filter(card => card.selected === true).length === 1;
  }
  return data.selected;
};

const saveUserCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_CARD_SUCCESS': {
      const data = action.data.cards;
      return {
        ...state,
        cards: Array.isArray(data) ? data : [data],
        message: action.data.message,
        hasDefaultCard: checkDefaultCard(data),
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
        hasDefaultCard: false,
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

