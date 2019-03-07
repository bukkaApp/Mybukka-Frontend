import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import './navbar.scss';

const PrimaryNavbar = ({ push }) => (
  <Fragment>
    <div className="container">
      <nav className="navbar navbar-light">
        <Brand />
        <div className="form-inline">
          <Button
            type="button"
            text="sign in"
            handleClick={() => push('/login')}
            classNames="small-outline-button"
            id="/login"
          />
          <Button
            type="button"
            text="sign up"
            handleClick={() => push('/signup')}
            classNames="small-button"
            id="/signup"
          />
        </div>
      </nav>
    </div>
  </Fragment>
);

export default PrimaryNavbar;

PrimaryNavbar.propTypes = {
  push: PropTypes.func.isRequired
};

