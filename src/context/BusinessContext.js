import { useEffect, useReducer } from 'react';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const SET_BUSINESS = 'SET_BUSINESS';

const initialState = {
  business: null,
  status: {
    fetched: false,
    error: false,
  },
  errorMessage: '',
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_BUSINESS}_SUCCESS`:
      return {
        ...state,
        business: action.data.fetchedBukka,
        status: {
          fetched: true,
          error: false
        },
        errorMessage: ''
      };

    case `${SET_BUSINESS}_ERROR`:
      return {
        ...state,
        business: null,
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

const loggerReducer = logger(reducer);

const useBusiness = () => {
  const [data, setData] = useLocalStorage('business', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setBusiness = (payload, error) => {
    dispatch({
      type: `${SET_BUSINESS}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const { business, message, currentPage, errorMessage, status } = state;

  return { business, message, currentPage, errorMessage, status, setBusiness };
};

export const [BusinessProvider, useBusinessContext] = constate(useBusiness);

