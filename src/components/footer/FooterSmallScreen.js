import React from 'react';
import './FooterSmallScreen.scss';
import { useCartContext } from '../../context/CartContext';

const FooterSmallScreen = ({ classNames, price }) => {
  const { setIncrementInProgressCart, setDecrementInProgressCart, inProgressCart } = useCartContext();

  return (
    <div className={`${classNames || 'Footer-SmallScreen'}`}>
      <div aria-pressed="false" tabIndex="0" role="button" onClick={() => setDecrementInProgressCart(price)} className="Footer-SmallScreen-Minus">-</div>
      <div className="Footer-SmallScreen-Value"><span>{inProgressCart.quantity}</span></div>
      <div aria-pressed="false" tabIndex="0" role="button" onClick={() => setIncrementInProgressCart(price)} className="Footer-SmallScreen-Plus">+</div>
    </div>
  );
};

export default FooterSmallScreen;
