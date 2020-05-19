import { useEffect, useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  cookie: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USE_COOKIE':
      return { ...state, cookie: true };

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useCookie = () => {
  const [data, setData] = useLocalStorage('cookie-disclaimer', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const displayCookie = () => {
    dispatch({
      type: 'USE_COOKIE',
    });
  };

  const { cookie } = state;

  return { cookie, displayCookie };
};

export const [CookieProvider, useCookieContext] = constate(useCookie);
