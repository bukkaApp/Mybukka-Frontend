const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [],
    message: '',
  },
  currentPage: 1,
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  },
};

const bukkasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BUKKAS_SUCCESS': {
      const { nearbyBukkas } = state.fetchedBukkas;

      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          message: action.data.message,
          nearbyBukkas: [...nearbyBukkas, ...action.data.nearByBukkas],
        },
        currentPage: action.data.currentPage,
        status: {
          fetchedBukkas: true,
          error: false,
        },
        errorMessage: '',
      };
    }

    case 'FETCH_BUKKAS_ERROR':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
        },
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.data.message || 'an error occured',
      };

    default: {
      return state;
    }
  }
};

export default bukkasReducer;
