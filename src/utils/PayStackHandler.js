import React from 'react';
import { useModalContext } from '../context/ModalContext';

const Paystackhandler = (data) => {
  const {
    paymentSecurityPopup,
    paymentGatewayPopup,
    paymentPendingPopup,
    setPaymentSecurityPopup,
    setPaymentPendingPopup,
    setPaymentGatewayPopup,
    setModal,
  } = useModalContext();

  switch (data.status) {
    case 'status':
      return setModal;
    case 'url':
    case 'success':
      if (data.gateway_response === 'Approved') {
      } else if (data.gateway_response === 'Successful') {
      }

    case 'pending':
      if (!paymentPendingPopup) {
        return () => {
          setPaymentSecurityPopup(false);
          setPaymentGatewayPopup(true);
        };
      }
      break;

    case 'failed':
      break;
    case 'open_url':
    case 'send_phone':
    case 'send_birthday':
    case 'send_otp':
    case 'send_pin':
    case 'send_address':
      return () => {
        setPaymentSecurityPopup;
        setPaymentGatewayPopup;
        break;
      };
    default:
      break;
  }
};
export default Paystackhandler;
