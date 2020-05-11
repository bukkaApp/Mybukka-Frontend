/* eslint-disable max-len */
import { useEffect, useReducer, useCallback } from 'react';
import constate from 'constate';
import { SET_BIZ_CATEGORIES, SET_MORE_BIZ_CATEGORIES } from '../redux/actionTypes';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';
import API from '../shared/api';
import { useLoadingContext } from './UseLoading';
import { useLocationContext } from './LocationContext';

const initialState = {
  categories: [],
  currentPage: 1,
  errorMessage: '',
  status: {
    fetched: false,
    error: false,
  }
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_BIZ_CATEGORIES}_SUCCESS`: {
      const { currentPage, fetchedBukkas } = action.data;
      // newState object/data - avoid max-length
      const newState = { categories: fetchedBukkas, currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_BIZ_CATEGORIES}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { categories: [], errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    case `${SET_MORE_BIZ_CATEGORIES}_SUCCESS`: {
      const { currentPage, fetchedCuisine: { category: categories } } = action.data;
      // newState object/data - avoid max-length
      const newState = { categories: [...state.categories, ...categories], currentPage, errorMessage: '' };
      return { ...state, ...newState, status: { fetched: true, error: false }, };
    }

    case `${SET_MORE_BIZ_CATEGORIES}_ERROR`: {
      const { message } = action.data;
      // pre-setState object/data - avoid max-length
      const newState = { errorMessage: message };
      return { ...state, ...newState, status: { fetched: false, error: true }, };
    }

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useBusinessCategories = () => {
  const { coordinates } = useLocationContext();
  const { loading } = useLoadingContext();
  const [data, setData] = useLocalStorage('bsc', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { categories, currentPage, status: { fetched, error }, errorMessage } = state;

  const setBizCategories = (payload) => {
    dispatch({
      type: `${SET_BIZ_CATEGORIES}_SUCCESS`,
      data: payload
    });
  };

  const setBizCategoriesError = (payload) => {
    dispatch({
      type: `${SET_BIZ_CATEGORIES}_ERROR`,
      data: payload
    });
  };

  const setMoreBizCategories = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_CATEGORIES}_SUCCESS`,
      data: payload
    });
  };

  const setMoreBizCategoriesError = (payload) => {
    dispatch({
      type: `${SET_MORE_BIZ_CATEGORIES}_ERROR`,
      data: payload
    });
  };

  const fetchBusinessCategories = useCallback(async (lglt) => {
    try {
      loading(SET_BIZ_CATEGORIES, true);
      const request = await API.businessCategories.getWithquery(`longitude=${lglt[0]}&lattitude=${lglt[1]}`);
      loading(SET_BIZ_CATEGORIES, false);
      setBizCategories(request.data);
    } catch (err) {
      loading(SET_BIZ_CATEGORIES, false);
      // if (!err.response) dispatch(alertMessage(FETCH_BUKKAS, true, 'Please check your network'));
      setBizCategoriesError(err.response.data);
    }
  }, [coordinates]);

  return { categories, currentPage, fetched, error, errorMessage, fetchBusinessCategories, setBizCategories, setBizCategoriesError, setMoreBizCategories, setMoreBizCategoriesError };
};

export const [BusinessCategoriesProvider, useBusinessCategoriesContext] = constate(useBusinessCategories);
