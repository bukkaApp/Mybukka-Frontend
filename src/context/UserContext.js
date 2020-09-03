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
  history: null,
  paymentException: null,
  url: {},
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

    case 'SET_PAYMENT_EXCEPTION':
      return { ...state, paymentException: action.payload };

    case 'SET_PAYMENT': {
      const payment = action.payload ? { ...state.payment, ...action.payload } : null;
      return { ...state, payment };
    }

    case 'SET_URL': {
      return { ...state, url: action.payload };
    }

    case 'SET_HISTORY': {
      const history = action.payload ? { ...state.history, ...action.payload } : null;
      return { ...state, history };
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

  const setUrl = (payload) => {
    dispatch({
      type: 'SET_URL',
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

  const setPaymentException = (payload) => {
    dispatch({
      type: 'SET_PAYMENT_EXCEPTION',
      payload
    });
  };

  const setHistory = (payload) => {
    dispatch({
      type: 'SET_HISTORY',
      payload,
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

  const { user, signIn, token, history, payment, url, address, card, isAuthenticated, isVerified, paymentException } = state;

  return {
    signIn, // auto-login data
    setSignInData, // auto-login purpose
    token,
    isAuthenticated,
    loginSuccess,
    isVerified,
    setVerified,
    user,
    setUser,
    setProfile,
    history,
    setHistory,
    payment,
    setPayment,
    url,
    setUrl,
    card,
    setCard,
    address,
    setAddress,
    paymentException,
    setPaymentException,
    logoutSuccess, };
};

export const [UserProvider, useUserContext] = constate(useUser);
