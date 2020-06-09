import { useEffect, useReducer } from 'react';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const SET_BUSINESSES = 'SET_BUSINESSES';
const SET_BUSINESS_GROUP = 'SET_BUSINESS_GROUP';
const SET_BUSINESS_CATEGORIES = 'SET_BUSINESS_CATEGORIES';
const SET_BUSINESSES_PAGINATION = 'SET_BUSINESSES_PAGINATION';

const initialState = {
  businesses: null,
  businessGroup: null,
  categories: null,
  message: '',
  currentPage: 1,
  errorMessage: '',
  status: {
    fetchedBukkas: false,
    error: false,
  }
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_BUSINESSES}_SUCCESS`: {
      return {
        ...state,
        message: action.payload.message,
        businesses: action.payload.nearByBukkas,
        currentPage: action.payload.currentPage || 1,
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };
    }

    case `${SET_BUSINESSES}_ERROR`:
      return {
        ...state,
        message: '',
        businesses: null,
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.payload.message,
      };

    case `${SET_BUSINESSES_PAGINATION}_SUCCESS`: {
      const { nearbyBukkas } = state.fetchedBukkas;

      return {
        ...state,
        message: action.payload.message,
        businesses: [...nearbyBukkas, ...action.payload.nearByBukkas],
        currentPage: action.payload.currentPage,
        status: {
          fetchedBukkas: true,
          error: false
        },
        errorMessage: '',
      };
    }

    case `${SET_BUSINESSES_PAGINATION}_ERROR`:
      return {
        ...state,
        status: {
          fetchedBukkas: false,
          error: true,
        },
        errorMessage: action.payload.message,
      };

    case `${SET_BUSINESS_GROUP}_SUCCESS`:
      return {
        ...state,
        businessGroup: action.payload.fetchedBukkas
      };

    case `${SET_BUSINESS_GROUP}_ERROR`:
      return {
        businessGroup: null
      };

    case `${SET_BUSINESS_CATEGORIES}_SUCCESS`:
      return {
        ...state,
        categories: action.payload.fetchedBukkas
      };

    case `${SET_BUSINESS_CATEGORIES}_ERROR`:
      return {
        categories: null
      };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useBusinesses = () => {
  const [data, setData] = useLocalStorage('businesses', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setBusinesses = (payload, error) => {
    dispatch({
      type: `${SET_BUSINESSES}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const setBusinessGroup = (payload, error) => {
    dispatch({
      type: `${SET_BUSINESS_GROUP}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const setBusinessCategories = (payload, error) => {
    dispatch({
      type: `${SET_BUSINESS_CATEGORIES}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const setBusinessesPagination = (payload, error) => {
    dispatch({
      type: `${SET_BUSINESSES_PAGINATION}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const { businesses, categories, businessGroup, message, currentPage, errorMessage, status } = state;

  return { businesses, message, categories, currentPage, errorMessage, status, businessGroup, setBusinessCategories, setBusinessGroup, setBusinessesPagination, setBusinesses };
};

export const [BusinessesProvider, useBusinessesContext] = constate(useBusinesses);
