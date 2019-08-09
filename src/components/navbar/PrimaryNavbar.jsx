import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import AuthModal from './common/AuthModal';
import navAuthentication from './actionCreators/navAuthentication';
import './navbar.scss';

const PrimaryNavbar = ({ push, navigateToNextRoute, authButton }) => {
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    navigateToNextRoute(id);
  };

  const minWidth = window.innerWidth;
  let btnAttribute = { handleClick: navigateToAuth };
  if (minWidth > 767) {
    btnAttribute = {
      dataToggle: 'modal',
      dataTarget: '#authModal',
      handleClick: goToAuthRoute
    };
  }

  return (
    <Fragment>
      <AuthModal push={push} />
      <div className="">
        <nav className="container navbar navbar-light">
          <Brand />
          {authButton &&
          <div className="form-inline">
            <Button
              type="button"
              text="sign in"
              {...btnAttribute}
              classNames="small-outline-button"
              id="/login"
            />
            <Button
              type="button"
              text="sign up"
              {...btnAttribute}
              classNames="small-button"
              id="/signup"
            />
          </div>
          }
        </nav>
      </div>
    </Fragment>
  );
};

export default connect(
  null,
  {
    navigateToNextRoute: navAuthentication
  }
)(PrimaryNavbar);

PrimaryNavbar.defaultProps = {
  authButton: false
};

PrimaryNavbar.propTypes = {
  authButton: PropTypes.bool,
  push: PropTypes.func.isRequired,
  navigateToNextRoute: PropTypes.func.isRequired
};
