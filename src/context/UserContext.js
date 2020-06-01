import { useEffect, useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';
import { useLocalStorage } from '../shared/useLocalStorage';

const initialState = {
  token: '',
  isAuthenticated: null,
  isVerified: false,
  user: null,
  address: null,
  card: null,
  payment: null,
  signIn: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: { ...state.user, ...action.payload.user }, token: action.data.token, isAuthenticated: true };

    case 'SET_VERIFIED':
    case 'LOGIN_SUCCESSFUL':
      return { ...state, ...action.data, isAuthenticated: true };

    case 'SET_ADDRESS': {
      const address = action.payload ? { ...state.address, ...action.payload } : null;
      return { ...state, address };
    }

    case 'SET_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };

    case 'SET_CARD': {
      const card = action.payload ? { ...state.card, ...action.payload } : null;
      return { ...state, card };
    }

    case 'SET_SIGNIN_DATA':
      return { ...state, signIn: action.payload };

    case 'SET_PAYMENT': {
      const payment = action.payload ? { ...state.payment, ...action.payload } : null;
      return { ...state, payment };
    }

    case 'LOGOUT_SUCCESSFUL':
      return { ...initialState };

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useUser = () => {
  const [data, setData] = useLocalStorage('user', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state);
  }, [state]);

  const setUser = (user, token) => {
    dispatch({
      type: 'SET_USER',
      payload: { user },
      data: { token }
    });
  };

  const setProfile = (payload) => {
    dispatch({
      type: 'SET_PROFILE',
      payload,
    });
  };

  const setAddress = (payload) => {
    dispatch({
      type: 'SET_ADDRESS',
      payload
    });
  };

  const setCard = (payload) => {
    dispatch({
      type: 'SET_CARD',
      payload
    });
  };

  const setPayment = (payload) => {
    dispatch({
      type: 'SET_PAYMENT',
      payload,
    });
  };

  const setSignInData = (payload) => {
    dispatch({
      type: 'SET_SIGNIN_DATA',
      payload,
    });
  };

  const setVerified = (isVerified) => {
    dispatch({
      type: 'SET_VERIFIED',
      data: { isVerified }
    });
  };

  const loginSuccess = (user, token) => {
    dispatch({
      type: 'LOGIN_SUCCESSFUL',
      data: { token }
    });
  };

  const logoutSuccess = () => {
    dispatch({
      type: 'LOGOUT_SUCCESSFUL',
    });
  };

  const { user, signIn, token, payment, address, card, isAuthenticated, isVerified } = state;

  return { user, signIn, setSignInData, payment, address, card, token, isAuthenticated, isVerified, setPayment, setCard, setProfile, setAddress, setUser, loginSuccess, logoutSuccess, setVerified };
};

export const [UserProvider, useUserContext] = constate(useUser);
