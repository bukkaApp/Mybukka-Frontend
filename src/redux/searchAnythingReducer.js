const initialState = {
  search: ''
};

const searchAnythingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_ANYTHING_ADD':
      return {
        ...state,
        search: action.data,
      };

    case 'SEARCH_ANYTHING_REMOVE':
      return {
        ...state,
        search: '',
      };

    default: {
      return state;
    }
  }
};

export default searchAnythingReducer;

