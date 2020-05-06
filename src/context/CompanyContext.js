import { useEffect, useReducer } from 'react';
import { FETCH_BUKKA } from 'Redux/actionTypes';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  company: {},
  status: {
    fetched: false,
    error: false,
  },
  errorMessage: '',
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${FETCH_BUKKA}_SUCCESS`:
      return {
        ...state,
        fetchedBukka: action.data.fetchedBukka,
        status: {
          fetched: true,
          error: false
        },
        errorMessage: ''
      };

    case `${FETCH_BUKKA}_ERROR`:
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

const loggerReducer = logger(reducer);

const useCompany = () => {
  // co - company
  const [data, setData] = useLocalStorage('co', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setError = (error) => {
    dispatch({
      type: `${FETCH_BUKKA}_ERROR`,
      data: { error }
    });
  };

  const setBusiness = (business) => {
    dispatch({
      type: `${FETCH_BUKKA}_SUCCESS`,
      data: { business }
    });
  };

  const { company, status, errorMessage } = state;

  return { company, status, errorMessage, setBusiness, setError, };
};

export const [CompanyProvider, useCompanyContext] = constate(useCompany);
