import React, { Fragment, useState, useEffect } from 'react';

import CartItems from 'Components/cart/CartItems';
import Brand from 'Components/brand/Brand';
import CartSection from '../cart/CartSection';
import EmptyCart, { CartDropdown } from '../cart/EmptyCart';
import CartIconSection from '../cart/CartIconSection';
import UserDefaultImage from './common/UserDefaultImage';

import './navbar.scss';

const AuthenticaticatedNavbar = () => {
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
  }, [wrapperRef]);

  return (
    <Fragment>
      <CartItems />
      <nav className="container navbar navbar-light">
        <Brand />
        <div className="form-inline">
          <UserDefaultImage />
          <div className="position-relative">
            <div>
              <CartSection handleClick={handleClick} />
            </div>
            <div ref={wrapperRef}>
              <CartDropdown display={isFocused}>
                <EmptyCart />
                <CartIconSection />
              </CartDropdown>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
export default AuthenticaticatedNavbar;
