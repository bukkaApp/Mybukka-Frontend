import React from 'react';

import CartItems from 'Components/common/CartItems';
import Brand from 'Components/brand/Brand';
import CartSection from './CartSection';
import UserDefaultImage from './UserDefaultImage';

import './navbar.scss';

const AuthenticaticatedNavbar = () => (
  <div className="container">
    <CartItems />
    <nav className="navbar navbar-light">
      <Brand />
      <div className="form-inline">
        <UserDefaultImage />
        <CartSection />
      </div>
    </nav>
  </div>
);

export default AuthenticaticatedNavbar;
