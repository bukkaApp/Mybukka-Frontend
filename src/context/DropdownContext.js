import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const SET_USER_OR_NAV_OPTIONS = 'SET_USER_OR_NAV_OPTIONS';

const initialState = {
  userOptions: false,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_USER_OR_NAV_OPTIONS:
      return { ...state, userOptions: action.payload };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useDropdown = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const setUserOptions = (payload) => {
    dispatch({
      type: SET_USER_OR_NAV_OPTIONS,
      payload,
    });
  };

  const { userOptions, } = state;

  return { userOptions, setUserOptions };
};

export const [DropdownProvider, useDropdownContext] = constate(useDropdown);
