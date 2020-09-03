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
  // address data could be utilize on checkout
  address: null,
  payment: null
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

  const setAddressReport = ({ res, change }) => {
    dispatch({
      type: 'SET_ADDRESS_FORM_VALIDITY',
      payload: {
        addressValid: res || state.addressValid,
        changeAddress: change || state.changeAddress
      }
    });
  };

  const setPaymentReport = ({ res, change }) => {
    dispatch({
      type: 'SET_PAYMENT_FORM_VALIDITY',
      payload: {
        paymentValid: res || state.paymentValid,
        changePayment: change || state.changePayment
      }
    });
  };

  const resetPaymentReport = () => {
    dispatch({
      type: 'RESET_PAYMENT_FORM_VALIDITY',
      payload: {
        paymentValid: null,
        changePayment: null
      }
    });
  };

  const resetAddressReport = () => {
    dispatch({
      type: 'RESET_ADDRESS_FORM_VALIDITY',
      payload: {
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
    setPaymentReport,
    setAddressReport,
    resetPaymentReport,
    resetAddressReport,
  };
};

export const [FormReportProvider, useFormReportContext] = constate(useFormReport);
