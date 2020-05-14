import { useReducer } from 'react';
import { SET_MODAL } from 'Redux/actionTypes';
import constate from 'constate';
import logger from './Logger';

const SET_MOBILE_VIEW_CART = 'SET_MOBILE_VIEW_CART';
const SET_AUTHENTICATION_POPUP = 'SET_AUTHENTICATION_POPUP';

const initialState = {
  show: false,
  viewMoreOrderOnMobile: false,
  authenticationPopup: false,
};

const reducer = (originalState, action) => {
  const state = Object.assign({}, originalState);
  switch (action.type) {
    case SET_MODAL:
      return { ...state, show: action.payload };

    case SET_MOBILE_VIEW_CART:
      return { ...state, viewMoreOrderOnMobile: action.payload };

    case SET_AUTHENTICATION_POPUP:
      return { ...state, authenticationPopup: action.payload };

    default: {
      return state;
    }
  }
};

const loggerReducer = logger(reducer);

const useModal = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const setModal = (payload) => {
    dispatch({
      type: SET_MODAL,
      payload,
    });
  };

  const setViewMoreOrderOnMobile = (payload) => {
    dispatch({
      type: SET_MOBILE_VIEW_CART,
      payload,
    });
  };

  const setAuthenticationPopup = (payload) => {
    dispatch({
      type: SET_AUTHENTICATION_POPUP,
      payload,
    });
  };

  const { show, viewMoreOrderOnMobile, authenticationPopup } = state;

  return { show, viewMoreOrderOnMobile, setModal, setViewMoreOrderOnMobile, authenticationPopup, setAuthenticationPopup };
};

export const [ModalProvider, useModalContext] = constate(useModal);
