const initialState = {
  fetchedBukka: { location: { coordinates: [] } },
  status: {
    fetched: false,
    error: false,
  },
  errorMessage: '',
};

const fetchBukkaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BUKKA_SUCCESS':
      return {
        ...state,
        fetchedBukka: action.data.fetchedBukka,
        status: {
          fetched: true,
          error: false
        },
        errorMessage: ''
      };

    case 'FETCH_BUKKA_ERROR':
      return {
        ...state,
        fetchedBukka: {},
        status: {
          fetched: false,
          error: true,
        },
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};

export default fetchBukkaReducer;
