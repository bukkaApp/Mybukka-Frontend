import React from 'react';
import Button from '../button/Button';
import Brand from '../brand/Brand';

import './navbar.scss';

const PrimaryNavbar = () => (
  <div className="container">
    <nav className="navbar navbar-light">
      <Brand />
      <div className="form-inline">
        <Button
          type="button"
          text="sign in"
          classNames="small-outline-button"
          handleClick={() => {}}
        />
        <Button
          type="button"
          text="sign up"
          classNames="small-button"
          handleClick={() => {}}
        />
      </div>
    </nav>
  </div>
);

export default PrimaryNavbar;
