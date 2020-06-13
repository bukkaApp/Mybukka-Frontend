import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useModalContext } from '../../context/ModalContext';

import './index.scss';

const CatelogsPopupOnSmallScreen = lazy(() => import('../popup/CatelogsPopupOnSmallScreen'));
const AddToCart = lazy(() => import('../cart/addToCart'));
const ViewOrdersOnMobile = lazy(() => import('../cart/ViewOrdersOnMobile'));
const Authentication = lazy(() => import('../popup/AuthenticationPopup'));
const VerifyPhonePopup = lazy(() => import('../verify-phone-popup'));
const Address = lazy(() => import('../address/Address'));
const Payment = lazy(() => import('../payment/Payment'));
const RequestSecurityInfo = lazy(() => import('../payment-security/PaymentSecurity'));
const PaymentGateway = lazy(() => import('../payment-gateway/PaymentGateway'));
const PaymentPending = lazy(() => import('../payment-pending/PaymentPending'));
const InviteFriends = lazy(() => import('../invite-friends/InviteFriends'));
const BusinessClosedPopup = lazy(() => import('../popup/BusinessClosedPopup'));

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
      <Suspense fallback={<div>loading ...</div>}>
        <AddToCart />
        <ViewOrdersOnMobile />
        <Authentication />
        <VerifyPhonePopup />
        <Address withModal withPadding label="Add Address" />
        <Payment withModal withPadding label="Add Payment Details" />
        <RequestSecurityInfo />
        <PaymentGateway />
        <PaymentPending />
        <InviteFriends />
        <BusinessClosedPopup />
        <CatelogsPopupOnSmallScreen />
      </Suspense>
    </div>
  );
};

export default ModalRoot;
