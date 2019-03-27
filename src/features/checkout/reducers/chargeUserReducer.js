const initialState = {
  status: false,
  message: '',
  data: {
    reference: '',
    status: '',
    display_text: ''
  }
};

const chargeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHARGE_USER_SUCCESS' || 'CHARGE_USER_ERROR': {
      const { data } = action;
      return {
        ...state,
        ...data
      };
    }

    default: {
      return state;
    }
  }
};

export default chargeUserReducer;
