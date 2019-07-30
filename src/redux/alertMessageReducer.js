const initialState = {
  status: false,
  message: '',
};

const alertMessageReducer = (state = initialState, action) => ({
  ...state,
  status: action.status,
  message: action.message
});

export default alertMessageReducer;
