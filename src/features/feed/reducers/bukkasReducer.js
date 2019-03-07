const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [],
    message: ''
  },
  errorMessage: '',
  status: {
    fectchedBukkas: false,
    error: false,
  }
};

const bukkasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BUKKAS_SUCCESS':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          ...action.data,
          nearbyBukkas: action.data.nearByBukkas,
        },
        status: {
          fectchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };

    case 'FETCH_BUKKAS_ERROR':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          nearbyBukkas: []
        },
        status: {
          fectchedBukkas: false,
          error: true,
        },
        errorMessage: action.data.message,
      };

    default: {
      return state;
    }
  }
};

export default bukkasReducer;
