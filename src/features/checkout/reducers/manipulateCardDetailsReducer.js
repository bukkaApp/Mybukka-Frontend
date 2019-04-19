const initialState = {
  cvv: '',
  number: '',
  expiry_month: '',
  expiry_year: '',
};

const manipulatecardDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MANIPULATE_CARD_DETAILS': {
      const { expDate, cvv, number } = action.data;
      const cardValidityDates = expDate ? expDate.split('/') : ['', ''];
      return {
        ...state,
        cvv,
        number,
        expiry_month: cardValidityDates[0],
        expiry_year: cardValidityDates[1],
      };
    }

    default: {
      return state;
    }
  }
};

export default manipulatecardDetailsReducer;
