import React, { useState, useEffect } from 'react';

import CartSection from './CartSection';
import EmptyCart, { CartDropdown } from './EmptyCart';
import CartIconSection from './CartIconSection';


const CartScene = () => {
  const wrapperRef = React.createRef();
  const [isFocused, setFocus] = useState(false);

  const handleClick = () => {
    setFocus(!isFocused);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="position-relative">
      <div>
        <CartSection handleClick={() => handleClick('cart')} />
      </div>
      <div ref={wrapperRef}>
        <CartDropdown display={isFocused}>
          <EmptyCart />
          <CartIconSection />
        </CartDropdown>
      </div>
    </div>
  );
};

export default CartScene;
