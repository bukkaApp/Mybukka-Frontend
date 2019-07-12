import { REPORT_ISSUE } from 'Redux/actionTypes';

const initialState = {
  newComment: {},
  success: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REPORT_ISSUE}_SUCCESS`:
      return {
        ...state,
        success: true,
        newComment: action.data.newComment,
        errorMessage: '',
      };

    case `${REPORT_ISSUE}_ERROR`:
      return {
        ...state,
        success: false,
        newComment: {},
        errorMessage: action.data.message,
      };

    default: {
      return state;
    }
  }
};
