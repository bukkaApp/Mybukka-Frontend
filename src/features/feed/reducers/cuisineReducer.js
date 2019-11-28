/* eslint-disable no-underscore-dangle */
import {
  FETCH_RESTAURANTS_CUISINES,
  SET_CUISINE_TO_DISPLAY,
  FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE,
  FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE,
} from 'Redux/actionTypes';

const initialState = {
  fetchedBukkas: [],
  cuisineToDisplay: {},
  cuisineItems: [],
  errorMessage: '',
  currentPage: 1,
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const bukkasReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_RESTAURANTS_CUISINES}_SUCCESS`: {
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

    case `${FETCH_RESTAURANTS_CUISINES}_ERROR`:
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

    case SET_CUISINE_TO_DISPLAY: {
      const { slug, name, description } = action;
      return {
        ...state,
        currentPage: 1,
        promotionToDisplay: {
          slug, name, description
        }
      };
    }

    case `${FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE}_SUCCESS`: {
      return {
        ...state,
        currentPage: 1,
        cuisineItems: action.data.fetchedCuisine.category,
        cuisineToDisplay: {
          ...action.data.fetchedCuisine,
          slug: action.data.fetchedCuisine._id,
        },
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: ''
      };
    }

    case `${FETCH_BUKKAS_RELATED_TO_SINGLE_CUISINE}_ERROR`:
      return {
        ...state,
        status: {
          fetchedBukkas: false,
          error: true
        },
        errorMessage: action.data.message
      };

    case `${FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE}_SUCCESS`: {
      return {
        ...state,
        currentPage: action.currentPage,
        cuisineItems: [
          ...state.cuisineItems,
          ...action.data.fetchedCuisine.category,
        ],
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: ''
      };
    }

    case `${FETCH_MORE_BUKKAS_RELATED_TO_SINGLE_CUISINE}_ERROR`:
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

export default bukkasReducer;
