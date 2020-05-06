import { useEffect, useState, useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  status: false
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  return {
    ...state,
    status: action.status,
  };
};

const loggerReducer = logger(reducer);

const useLoading = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const loading = (action, status) => dispatch({
    type: `${action}_LOADING`,
    status,
  });

  const { status } = state;

  return { status, loading };
};

export const [
  LoadingProvider, useLoadingContext] = constate(useLoading);
