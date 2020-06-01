import { useReducer } from 'react';
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
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const loading = (type, status) => dispatch({
    type: `${type}_LOADING`,
    status,
  });

  const { status } = state;

  return { status, loading };
};

export const [
  LoadingProvider, useLoadingContext] = constate(useLoading);
