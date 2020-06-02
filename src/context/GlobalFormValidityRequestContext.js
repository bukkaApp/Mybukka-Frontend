import { useState } from 'react';
import constate from 'constate';

const initialState = {
  addressValidityReport: null,
  paymentValidityReport: null,
};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_ADDRESS_FORM':
//       return { ...state, addressValidityReport: action.payload };

//     case 'SET_PAYMENT_FORM':
//       return { ...state, paymentValidityReport: action.payload };

//     default:
//       return state;
//   }
// };

const useGlobalFormValidityRequest = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useState(initialState);

  // const reportAddressValidity = payload => dispatch({ type: 'SET_ADDRESS_FORM', payload });
  const reportAddressValidity = payload => dispatch({ addressValidityReport: payload });

  // const reportPaymentValidity = payload => dispatch({ type: 'SET_PAYMENT_FORM', payload });
  const reportPaymentValidity = payload => dispatch({ paymentValidityReport: payload });


  const { paymentValidityReport, addressValidityReport, } = state;

  return { paymentValidityReport, addressValidityReport, reportPaymentValidity, reportAddressValidity };
};

export const [GlobalFormValidityRequestProvider, useGlobalFormValidityRequestContext] = constate(useGlobalFormValidityRequest);
