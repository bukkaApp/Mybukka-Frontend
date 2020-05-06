import { useEffect, useReducer, useCallback } from 'react';
import { SET_COMPANY } from 'src/redux/actionTypes';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';
import { useLocationContext } from './LocationContext';
import { useLoadingContext } from './UseLoading';
import API from '../shared/api';

const initialState = {
  cart: {},
  totalCost: 0,
  initialTime: 0,
  sub_menus: {
    productSlug: '',
    submenus: []
  },
  status: {
    updated: false,
    error: false,
  },
  errorMessage: '',
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_COMPANY}_SUCCESS`: {
      const newState = { ...state, company: action.data.fetchedBukka };
      return { ...newState, status: { fetched: true, error: false }, errorMessage: '' };
    }

    case `${SET_COMPANY}_ERROR`:
      return { ...state, company: {}, status: { fetched: false, error: true, }, errorMessage: action.data.message };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useCompany = () => {
  const { coordinates } = useLocationContext();
  const { loading } = useLoadingContext();
  const [data, setData] = useLocalStorage('co', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setCompanyError = (payload) => {
    dispatch({
      type: `${SET_COMPANY}_ERROR`,
      data: payload
    });
  };

  const setCompany = (payload) => {
    dispatch({
      type: `${SET_COMPANY}_SUCCESS`,
      data: payload
    });
  };

  const fetchCompany = useCallback(async (companyID, type = 'food') => {
    try {
      loading(SET_COMPANY, true);
      const request = await API.company.get(`${companyID}?type=${type}`);
      loading(SET_COMPANY, false);
      setCompany(request.data);
    } catch (err) {
      loading(SET_COMPANY, false);
      setCompanyError(err.response.data);
    }
  }, [coordinates]);

  const { company, status: { fetched, error }, errorMessage } = state;

  return { company, fetched, error, errorMessage, fetchCompany, setCompany, setCompanyError, };
};

export const [CompanyProvider, useCompanyContext] = constate(useCompany);
