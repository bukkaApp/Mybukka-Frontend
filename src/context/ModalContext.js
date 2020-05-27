import { useReducer } from 'react';
import { SET_MODAL } from 'Redux/actionTypes';
import constate from 'constate';
import logger from './Logger';

const SET_MOBILE_VIEW_CART = 'SET_MOBILE_VIEW_CART';
const SET_AUTHENTICATION_POPUP = 'SET_AUTHENTICATION_POPUP';
const SET_PHONE_VERIFICATION_POPUP = 'SET_PHONE_VERIFICATION_POPUP';
const SET_ADDRESS_POPUP = 'SET_ADDRESS_POPUP';

const initialState = {
  show: false,
  viewMoreOrderOnMobile: false,
  authenticationPopup: false,
  phoneVerificationPopup: false,
  addressPopup: false,
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

    case SET_ADDRESS_POPUP:
      return { ...state, addressPopup: action.payload };

    case SET_PHONE_VERIFICATION_POPUP:
      return { ...state, phoneVerificationPopup: action.payload };

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

  const setAddressPopup = (payload) => {
    dispatch({
      type: SET_ADDRESS_POPUP,
      payload,
    });
  };

  const setVerificationPhonePopup = (payload) => {
    dispatch({
      type: SET_PHONE_VERIFICATION_POPUP,
      payload,
    });
  };
  const { show, addressPopup, viewMoreOrderOnMobile, authenticationPopup, phoneVerificationPopup } = state;

  return { show, addressPopup, setAddressPopup, viewMoreOrderOnMobile, setModal, setViewMoreOrderOnMobile, authenticationPopup, setAuthenticationPopup, phoneVerificationPopup, setVerificationPhonePopup };
};

export const [ModalProvider, useModalContext] = constate(useModal);
