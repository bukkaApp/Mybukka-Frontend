import { useReducer, useEffect } from 'react';
import constate from 'constate';
import { useLocalStorage } from '../shared/useLocalStorage';
import logger from './Logger';

const initialState = {
  dark: false,
  hasThemeLoaded: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return { ...action.data };

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useDarkMode = () => {
  const [data, setData] = useLocalStorage('dark', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  const { dark, hasThemeLoaded } = state;

  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const setThemeState = (payload) => {
    dispatch({
      type: 'SET_DARK_MODE',
      data: {
        dark: payload.dark || dark,
        hasThemeLoaded: payload.hasThemeLoaded || hasThemeLoaded
      }
    });
  };

  return [state, setThemeState];
};

export const [DarkModeProvider, useDarkModeContext] = constate(useDarkMode);
