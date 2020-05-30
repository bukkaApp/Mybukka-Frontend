import { useReducer } from 'react';
import { SET_MODAL } from 'Redux/actionTypes';
import constate from 'constate';
import logger from './Logger';

const SET_MOBILE_VIEW_CART = 'SET_MOBILE_VIEW_CART';
const SET_AUTHENTICATION_POPUP = 'SET_AUTHENTICATION_POPUP';
const SET_PHONE_VERIFICATION_POPUP = 'SET_PHONE_VERIFICATION_POPUP';
const SET_ADDRESS_POPUP = 'SET_ADDRESS_POPUP';
const SET_PAYMENT_POPUP = 'SET_PAYMENT_POPUP';
const SET_PAYMENT_SECURITY_POPUP = 'SET_PAYMENT_SECURITY_POPUP';
const SET_PAYMENT_GATEWAY_POPUP = 'SET_PAYMENT_GATEWAY_POPUP';
const SET_PAYMENT_PENDING_POPUP = 'SET_PAYMENT_PENDING_POPUP';

const initialState = {
  show: false,
  viewMoreOrderOnMobile: false,
  authenticationPopup: false,
  phoneVerificationPopup: false,
  addressPopup: false,
  paymentPopup: false,
  paymentSecurityPopup: false,
  paymentGatewayPopup: false,
  paymentPendingPopup: false,
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

    case SET_PAYMENT_POPUP:
      return { ...state, paymentPopup: action.payload };

    case SET_PAYMENT_SECURITY_POPUP:
      return { ...state, paymentSecurityPopup: action.payload };

    case SET_PAYMENT_GATEWAY_POPUP:
      return { ...state, paymentGatewayPopup: action.payload };

    case SET_PAYMENT_PENDING_POPUP:
      return { ...state, paymentPendingPopup: action.payload };

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

  const setPaymentPopup = (payload) => {
    dispatch({
      type: SET_PAYMENT_POPUP,
      payload,
    });
  };

  const setPaymentSecurityPopup = (payload) => {
    dispatch({
      type: SET_PAYMENT_SECURITY_POPUP,
      payload,
    });
  };

  const setPaymentGatewayPopup = (payload) => {
    dispatch({
      type: SET_PAYMENT_GATEWAY_POPUP,
      payload,
    });
  };

  const setPaymentPendingPopup = (payload) => {
    dispatch({
      type: SET_PAYMENT_PENDING_POPUP,
      payload,
    });
  };

  const setVerificationPhonePopup = (payload) => {
    dispatch({
      type: SET_PHONE_VERIFICATION_POPUP,
      payload,
    });
  };
  const { show, paymentPendingPopup, paymentGatewayPopup, paymentSecurityPopup, paymentPopup, addressPopup, viewMoreOrderOnMobile, authenticationPopup, phoneVerificationPopup } = state;

  return { show, setModal, paymentPendingPopup, setPaymentPendingPopup, paymentGatewayPopup, setPaymentGatewayPopup, paymentSecurityPopup, setPaymentSecurityPopup, paymentPopup, setPaymentPopup, addressPopup, setAddressPopup, viewMoreOrderOnMobile, setViewMoreOrderOnMobile, authenticationPopup, setAuthenticationPopup, phoneVerificationPopup, setVerificationPhonePopup };
};

export const [ModalProvider, useModalContext] = constate(useModal);
