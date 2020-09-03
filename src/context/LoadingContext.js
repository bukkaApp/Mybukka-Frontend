import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  status: false
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        status: action.status,
      };


    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useLoading = () => {
  // const [data, setData] = useState();
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const loading = status => dispatch({
    type: 'LOADING',
    status,
  });

  const { status } = state;

  return { status, loading };
};

export const [
  LoadingProvider, useLoadingContext] = constate(useLoading);
