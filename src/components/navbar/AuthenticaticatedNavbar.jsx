import React, { Fragment, useState } from 'react';

import CartItems from 'Components/common/CartItems';
import Brand from 'Components/brand/Brand';
import CartSection from './CartSection';
import EmptyCart, { CartDropdown } from './EmptyCart';
import CartIconSection from '../common-navs/CartIconSection';
import UserDefaultImage from './UserDefaultImage';

import './navbar.scss';

const AuthenticaticatedNavbar = () => {
  const [isFocused, setFocus] = useState(false);

  const handleClick = () => {
    setFocus(!isFocused);
  };

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
            <CartDropdown display={isFocused}>
              <EmptyCart />
              <CartIconSection />
              <Button>
                <i></i>
              </Button>
            </CartDropdown>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
export default AuthenticaticatedNavbar;
