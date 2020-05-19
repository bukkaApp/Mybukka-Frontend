/* eslint-disable no-underscore-dangle */
import {
  FETCH_PROMOTED_BUKKAS,
  SET_PROMOTION_TO_DISPLAY,
  FETCH_SINGLE_PROMOTED_BUKKAS,
  FETCH_MORE_SINGLE_PROMOTED_BUKKAS,
} from 'Redux/actionTypes';

const initialState = {
  fetchedBukkas: [],
  promotionToDisplay: {},
  promotedBukkas: [],
  errorMessage: '',
  currentPage: 1,
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_PROMOTED_BUKKAS}_SUCCESS`: {
      return {
        ...state,
        ...action.data.fetchedBukkas,
        currentPage: 1,
        fetchedBukkas: action.data.fetchedBukkas,
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };
    }

    case `${FETCH_PROMOTED_BUKKAS}_ERROR`:
      return {
        ...state,
        fetchedBukkas: [],
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.data.message,
      };

    case SET_PROMOTION_TO_DISPLAY: {
      const { slug, name, description } = action;
      return {
        ...state,
        currentPage: 1,
        promotionToDisplay: {
          slug, name, description
        }
      };
    }

    case `${FETCH_SINGLE_PROMOTED_BUKKAS}_SUCCESS`: {
      return {
        ...state,
        currentPage: 1,
        promotedBukkas: action.data.fetchedPromotion.category || [],
        promotionToDisplay: {
          ...action.data.fetchedPromotion,
          slug: action.data.fetchedPromotion._id,
        },
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: ''
      };
    }

    case `${FETCH_SINGLE_PROMOTED_BUKKAS}_ERROR`:
      return {
        ...state,
        promotedBukkas: [],
        status: {
          fetchedBukkas: false,
          error: true
        },
        errorMessage: action.data.message
      };

    case `${FETCH_MORE_SINGLE_PROMOTED_BUKKAS}_SUCCESS`: {
      return {
        ...state,
        currentPage: action.currentPage,
        promotedBukkas: [
          ...state.promotedBukkas,
          ...action.data.fetchedPromotion.category,
        ],
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: ''
      };
    }

    case `${FETCH_MORE_SINGLE_PROMOTED_BUKKAS}_ERROR`:
      return {
        ...state,
        status: {
          fetchedBukkas: false,
          error: true
        },
        errorMessage: action.data.message
      };

    default: {
      return state;
    }
  }
};

export default businessesReducer;
