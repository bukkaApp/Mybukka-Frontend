import React from 'react';
import Brand from 'Components/brand/Brand';
import UserIcon from 'Components/icons/user';
import './primaryNavbar.scss';

const Navbar = () => (
  <div className="container-fluid border-bottom">
    <div className="px-xl-10 px-lg-5 primary-nav d-flex justify-content-between">
      <Brand />
      <div>
        <UserIcon />
      </div>
    </div>
  </div>
);

export default Navbar;
