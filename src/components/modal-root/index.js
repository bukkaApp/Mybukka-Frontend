import React, { useEffect, useState } from 'react';
import AddToCart from '../cart/addToCart';
import { useModalContext } from '../../context/ModalContext';
import ViewOrdersOnMobile from '../cart/ViewOrdersOnMobile';
import Authentication from '../authentication-popup';
import VerifyPhonePopup from '../verify-phone-popup';
import Address from '../address/Address';
import Payment from '../payment/Payment';
import RequestSecurityInfo from '../payment-security/RequestSecurityInfo';
import PaymentGateway from '../payment-gateway/PaymentGateway';
import PaymentPending from '../payment-pending/PaymentPending';
import './index.scss';

const ModalRoot = () => {
  const { show } = useModalContext();
  const [state, setState] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(show);
      return clearTimeout(timeout);
    }, 10);
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style = '';
  }, [show]);

  return (
    <div className={`Modal-Root-Wrapper ${state ? 'Modal-Root-Wrapper--active' : ''}`}>
      <AddToCart />
      <ViewOrdersOnMobile />
      <Authentication />
      <VerifyPhonePopup />
      <Address withModal withPadding label="Add Address" />
      <Payment withModal withPadding label="Add Payment Details" />
      <RequestSecurityInfo />
      <PaymentGateway />
      <PaymentPending />
    </div>
  );
};

export default ModalRoot;
