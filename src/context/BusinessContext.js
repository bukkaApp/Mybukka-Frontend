import { useEffect, useReducer } from 'react';
// import axios from 'axios';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const SET_BUSINESS = 'SET_BUSINESS';
const SET_CATELOGS = 'SET_CATELOGS';
const SET_CATELOG_TO_DISPLAY = 'SET_CATELOG_TO_DISPLAY';

const initialState = {
  business: null,
  catelogs: null,
  catelogToDisplay: null,
  errorMessage: null,
  status: {
    fetched: false,
    error: false,
  },
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case `${SET_BUSINESS}_SUCCESS`:
      return {
        ...state,
        business: action.payload.fetchedBukka,
        status: { fetched: true, error: false },
        errorMessage: null
      };

    case `${SET_BUSINESS}_ERROR`:
      return {
        ...state,
        business: null,
        status: { fetched: false, error: true, },
        errorMessage: action.payload.message
      };

    case `${SET_CATELOGS}_SUCCESS`:
      return {
        ...state,
        catelogs: action.payload.bukkaMenu,
        status: { fetched: true, error: false },
        errorMessage: null
      };

    case `${SET_CATELOGS}_ERROR`:
      return {
        ...state,
        catelogs: null,
        errorMessage: action.payload.message,
        status: { fetched: false, error: true, }
      };

    case SET_CATELOG_TO_DISPLAY: {
      const { catelogs } = state;
      const { payload } = action;

      const payloadIsId = typeof payload === 'string';

      if (payloadIsId) {
        const foundCatelog = catelogs.find(catelog => catelog.slug === payload);
        return {
          ...state,
          catelogToDisplay: { ...foundCatelog, quantity: 1 }
        };
      }

      return { ...state, catelogToDisplay: payload };
    }

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

  const setCatelogs = (payload, error) => {
    dispatch({
      type: `${SET_CATELOGS}_${error ? 'ERROR' : 'SUCCESS'}`,
      payload
    });
  };

  const setCatelogToDisplay = (payload) => {
    dispatch({
      type: SET_CATELOG_TO_DISPLAY,
      payload,
    });
  };

  const { business, catelogs, catelogToDisplay, errorMessage, status } = state;

  return { catelogs, business, catelogToDisplay, errorMessage, status, setBusiness, setCatelogs, setCatelogToDisplay };
};

export const [BusinessProvider, useBusinessContext] = constate(useBusiness);

