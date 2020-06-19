import { useReducer } from 'react';
import constate from 'constate';
import logger from './Logger';

const initialState = {
  // a form boolean validation confirmation, if form was valid
  addressValid: null,
  paymentValid: null,
  // a click simulated to change address or payment detail on checkout
  changeAddress: null,
  changePayment: null,
  // a simulation to trigger form validation effect, when click on checkout button
  // it is needed because both payment and address are entirely a seperate component
  // and to determine address or payment information is valid when you click a checkout btn
  // the 'request...Validity' is set to true for validity checks in the address and payment comp.
  // it only used in checkout, not needed in the profile.
  requestAddressValidity: null,
  requestPaymentValidity: null,
  // address data could be utilize on checkout
  address: {
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: '',
    location: null
  },
  payment: {
    number: '',
    expDate: '',
    cvv: '',
    zipCode: ''
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADDRESS_FORM_VALIDITY':
      return { ...state, ...action.payload };

    case 'SET_PAYMENT_FORM_VALIDITY':
      return { ...state, ...action.payload };

    case 'RESET_ADDRESS_FORM_VALIDITY':
      return { ...state, ...action.payload, address: initialState.address };

    case 'RESET_PAYMENT_FORM_VALIDITY':
      return { ...state, ...action.payload, payment: initialState.payment };

    case 'SET_ADDRESS':
      return { ...state, address: { ...state.address, ...action.payload } };

    case 'SET_PAYMENT':
      return { ...state, payment: { ...state.address, ...action.payload } };

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useFormReport = () => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  const setAddressReport = ({ req, res, change }) => {
    dispatch({
      type: 'SET_ADDRESS_FORM_VALIDITY',
      payload: {
        requestAddressValidity: req || state.requestAddressValidity,
        addressValid: res || state.addressValid,
        changeAddress: change || state.changeAddress
      }
    });
  };

  const setPaymentReport = ({ req, res, change }) => {
    dispatch({
      type: 'SET_PAYMENT_FORM_VALIDITY',
      payload: {
        requestPaymentValidity: req || state.requestPaymentValidity,
        paymentValid: res || state.paymentValid,
        changePayment: change || state.changePayment
      }
    });
  };

  const resetPaymentReport = () => {
    dispatch({
      type: 'RESET_PAYMENT_FORM_VALIDITY',
      payload: {
        requestPaymentValidity: null,
        paymentValid: null,
        changePayment: null
      }
    });
  };

  const resetAddressReport = () => {
    dispatch({
      type: 'RESET_ADDRESS_FORM_VALIDITY',
      payload: {
        requestAddressValidity: null,
        addressValid: null,
        changeAddress: null
      }
    });
  };

  const updateAddressData = (data) => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: data
    });
  };

  const updatePaymentData = (data) => {
    dispatch({
      type: 'SET_PAYMENT',
      payload: data
    });
  };

  const {
    address,
    payment,
    addressValid,
    paymentValid,
    requestAddressValidity,
    requestPaymentValidity,
    changeAddress,
    changePayment,
  } = state;

  return {
    address,
    payment,
    updateAddressData,
    updatePaymentData,
    addressValid,
    paymentValid,
    changeAddress,
    changePayment,
    requestAddressValidity,
    requestPaymentValidity,
    setPaymentReport,
    setAddressReport,
    resetPaymentReport,
    resetAddressReport,
  };
};

export const [FormReportProvider, useFormReportContext] = constate(useFormReport);
