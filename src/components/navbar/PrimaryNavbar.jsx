import React from 'react';

import PropTypes from 'prop-types';

import Button from '../button/Button';
import Brand from '../brand/Brand';

import './navbar.scss';

const PrimaryNavbar = ({ push }) => (
  <div className="container">
    <nav className="navbar navbar-light">
      <Brand />
      <div className="form-inline">
        <Button
          type="button"
          text="sign in"
          classNames="small-outline-button"
          handleClick={() => push('/login')}
        />
        <Button
          type="button"
          text="sign up"
          classNames="small-button"
          handleClick={() => push('/signup')}
        />
      </div>
    </nav>
  </div>
);

export default PrimaryNavbar;

PrimaryNavbar.propTypes = {
  push: PropTypes.func.isRequired
};
