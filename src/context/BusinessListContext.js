import { useReducer, useEffect, useState } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  store: null
};

const reducer = (state, action) => {
  const { store } = action;
  switch (action.type) {
    case 'HOVER_STORE':
      return {
        ...state,
        store
      };
    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useBusinessList = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { store } = state;

  const setHoveredBusiness = (payload) => {
    dispatch({
      type: 'HOVER_STORE',
      store: payload
    });
  };

  return {
    setHoveredBusiness,
    store
  };
};

export const [BusinessListProvider, useBusinessListContext] = constate(useBusinessList);
