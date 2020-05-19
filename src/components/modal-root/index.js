import React, { useEffect, useState } from 'react';
import AddToCart from '../cart/addToCart';
import { useModalContext } from '../../context/UseModal';
import ViewOrdersOnMobile from '../cart/ViewOrdersOnMobile';
import Authentication from '../authentication-popup';
import VerifyPhonePopup from '../verify-phone-popup';
import './index.scss';

const ModalRoot = () => {
  const { show } = useModalContext();
  const [state, setState] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(show);
    }, 10);
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style = '';
  }, [show]);

  return (
    <div className={`Modal-Root-Wrapper ${state ? 'Modal-Root-Wrapper--active' : ''}`}>
      <AddToCart />
      <ViewOrdersOnMobile />
      <Authentication />
      <VerifyPhonePopup />
    </div>
  );
};

export default ModalRoot;
