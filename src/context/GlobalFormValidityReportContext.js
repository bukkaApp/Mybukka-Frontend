import { useState } from 'react';
import constate from 'constate';

const initialState = {
  addressValidity: null,
  paymentValidity: null,
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_ADDRESS_FORM_VALIDITY':
//       return { ...state, addressValidity: action.payload };

//     case 'SET_PAYMENT_FORM_VALIDITY':
//       return { ...state, paymentValidity: action.payload };

//     default:
//       return state;
//   }
// };

const useGlobalFormValidity = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useState(initialState);

  // const setAddressValidity = payload => dispatch({ type: 'SET_ADDRESS_FORM_VALIDITY', payload });
  const setAddressValidity = payload => dispatch({ ...state, addressValidity: payload });

  // const setPaymentValidity = payload => dispatch({ type: 'SET_PAYMENT_FORM_VALIDITY', payload, });
  const setPaymentValidity = payload => dispatch({ ...state, paymentValidity: payload });

  const { paymentValidity, addressValidity, } = state;

  return { paymentValidity, addressValidity, setPaymentValidity, setAddressValidity };
};

export const [GlobalFormValidityReportProvider, useGlobalFormValidityReportContext] = constate(useGlobalFormValidity);
