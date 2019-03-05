import React from 'react';
import Brand from 'Components/brand/Brand';
import UserDefaultImage from './UserDefaultImage';
import './navbar.scss';

const AuthenticaticatedNavbar = () => (
  <div className="container">
    <nav className="navbar navbar-light">
      <Brand />
      <div className="form-inline">
        <UserDefaultImage />
      </div>
    </nav>
  </div>
);

export default AuthenticaticatedNavbar;
