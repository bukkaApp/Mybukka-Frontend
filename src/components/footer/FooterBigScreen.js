import React from 'react';

import FooterSmallScreen from './FooterSmallScreen';
import './FooterBigScreen.scss';

const FooterBigScreen = ({ fixed, totalCost = 0, price, handleClick, withQtyBtn, left, qty, text = 'Add to Cart', noPadding }) => {
  const hasValue = totalCost || price;

  return (
    <div className={`${fixed ? 'Footer-BigScreen-Fixed' : 'Footer-BigScreen'}`}>
      {withQtyBtn && <FooterSmallScreen price={price} classNames="Footer-BigScreen-Wrapper" />}
      <button onClick={handleClick} type="submit" data-add-to-cart="true" className={`Footer-BigScreen-Button ${noPadding ? '' : 'Footer-BigScreen-Button--Spacing'}`}>
        <span className={`Footer-BigScreen-Button-Item1 ${left ? 'Footer--left' : 'Footer--right'}`}>{qty}</span>
        <span className="Footer-BigScreen-Button-Item2"><span>{text}</span></span>
        <span className={`Footer-BigScreen-Button-Item3 ${left ? 'Footer--left' : 'Footer--right'}`}><span>{hasValue ? '₦' : ''} {totalCost || price}</span></span>
      </button>
    </div>
  );
};
export default FooterBigScreen;
