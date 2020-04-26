import React, { Fragment, useState, useEffect } from 'react';

import CartItems from 'Components/common/CartItems';
import Brand from 'Components/brand/Brand';
import CartSection from './CartSection';
import EmptyCart, { CartDropdown } from './EmptyCart';
import CartIconSection from '../common-navs/CartIconSection';
import UserDefaultImage from './UserDefaultImage';

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
  });

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
