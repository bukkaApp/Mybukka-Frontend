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
const SET_INVITE_POPUP = 'SET_INVITE_POPUP';
const SET_UNAUTHENTICATED_CHECKOUT_POPUP = 'SET_UNAUTHENTICATED_CHECKOUT_POPUP';
const SET_CART_POPUP = 'SET_CART_POPUP';
const SET_BUSINESS_CLOSED_POPUP = 'SET_BUSINESS_CLOSED_POPUP';
const CATELOGS_ON_SMALL_SCREEN_POPUP = 'CATELOGS_ON_SMALL_SCREEN_POPUP';
const SELECT_LOCATION_ON_SMALL_SCREEN_POPUP = 'SELECT_LOCATION_ON_SMALL_SCREEN_POPUP';

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
  unAuthenticatedCheckoutPopup: false,
  invitePopup: false,
  cartPopup: false,
  businessClosedPopup: false,
  catelogsOnSmallScreenPopup: false,
  selectLocationPopup: false,
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

    case SET_INVITE_POPUP:
      return { ...state, invitePopup: action.payload };

    case SET_UNAUTHENTICATED_CHECKOUT_POPUP:
      return { ...state, unAuthenticatedCheckoutPopup: action.payload };

    case SET_CART_POPUP:
      return { ...state, cartPopup: action.payload };

    case SET_BUSINESS_CLOSED_POPUP:
      return { ...state, businessClosedPopup: action.payload };

    case CATELOGS_ON_SMALL_SCREEN_POPUP:
      return { ...state, catelogsOnSmallScreenPopup: action.payload };

    case SELECT_LOCATION_ON_SMALL_SCREEN_POPUP:
      return { ...state, selectLocationPopup: action.payload };

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

  const setBusinessClosedPopup = (payload) => {
    dispatch({
      type: SET_BUSINESS_CLOSED_POPUP,
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

  const setInvitePopup = (payload) => {
    dispatch({
      type: SET_INVITE_POPUP,
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

  const setUnAuthenticatedCheckoutPopup = (payload) => {
    dispatch({
      type: SET_UNAUTHENTICATED_CHECKOUT_POPUP,
      payload,
    });
  };

  const setCatelogsOnSmallScreenPopup = (payload) => {
    dispatch({
      type: CATELOGS_ON_SMALL_SCREEN_POPUP,
      payload,
    });
  };

  const setSelectLocationPopup = (payload) => {
    dispatch({
      type: SELECT_LOCATION_ON_SMALL_SCREEN_POPUP,
      payload,
    });
  };

  const setCartPopup = (payload) => {
    dispatch({
      type: SET_CART_POPUP,
      payload,
    });
  };

  const {
    show,
    cartPopup,
    invitePopup,
    selectLocationPopup,
    businessClosedPopup,
    paymentPendingPopup,
    paymentGatewayPopup,
    paymentSecurityPopup,
    paymentPopup,
    addressPopup,
    viewMoreOrderOnMobile,
    authenticationPopup,
    phoneVerificationPopup,
    catelogsOnSmallScreenPopup,
    unAuthenticatedCheckoutPopup } = state;

  return {
    show,
    setModal,
    cartPopup,
    setCartPopup,
    invitePopup,
    setInvitePopup,
    selectLocationPopup,
    setSelectLocationPopup,
    businessClosedPopup,
    setBusinessClosedPopup,
    paymentPendingPopup,
    setPaymentPendingPopup,
    paymentGatewayPopup,
    setPaymentGatewayPopup,
    paymentSecurityPopup,
    setPaymentSecurityPopup,
    paymentPopup,
    setPaymentPopup,
    addressPopup,
    setAddressPopup,
    viewMoreOrderOnMobile,
    setViewMoreOrderOnMobile,
    authenticationPopup,
    setAuthenticationPopup,
    phoneVerificationPopup,
    setVerificationPhonePopup,
    catelogsOnSmallScreenPopup,
    setCatelogsOnSmallScreenPopup,
    unAuthenticatedCheckoutPopup,
    setUnAuthenticatedCheckoutPopup,
  };
};

export const [ModalProvider, useModalContext] = constate(useModal);
