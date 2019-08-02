const initialState = {
  fetchedBukkas: {
    nearbyBukkas: [],
    message: ''
  },
  currentPage: 1,
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const bukkasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BUKKAS_SUCCESS': {
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
          message: action.data.message,
          nearbyBukkas: action.data.nearByBukkas,
        },
        currentPage: action.data.currentPage,
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };
    }

    case 'FETCH_BUKKAS_ERROR':
      return {
        ...state,
        fetchedBukkas: {
          message: '',
          nearbyBukkas: []
        },
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.data.message,
      };

    case 'FETCH_BUKKAS_PAGINATE_SUCCESS': {
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
          error: false
        },
        errorMessage: '',
      };
    }

    case 'FETCH_BUKKAS_PAGINATE_ERROR':
      return {
        ...state,
        fetchedBukkas: {
          ...state.fetchedBukkas,
        },
        status: {
          fetchedBukkas: false,
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
