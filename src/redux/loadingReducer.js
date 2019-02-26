const initialState = {
  status: false
};

const loadingReducer = (state = initialState, action) => ({
  ...state,
  status: action.status,
});

export default loadingReducer;
