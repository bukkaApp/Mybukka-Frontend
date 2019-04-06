import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import AuthModal from './common/AuthModal';
import NavLink from '../navlink/Navlink';
import UserDefaultImage from './UserDefaultImage';
import navAuthentication from './actionCreators/navAuthentication';
import './bukka-authenticated-nav.scss';
import './navbar.scss';

const buttonProps = [
  { name: 'Food', href: '/feed' }, { name: 'Fresh', href: '/fresh' }, { name: 'Drinks', href: '/drinks' }
];

const BukkaAuthenticatedNav = ({ push, status, navigateToNextRoute }) => {
  const { authenticated } = status;
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    navigateToNextRoute(id);
  };

  const windowWidth = window.innerWidth;
  let btnAttribute = { handleClick: navigateToAuth };
  if (windowWidth > 767) {
    btnAttribute = {
      dataToggle: 'modal',
      dataTarget: '#modal',
      handleClick: goToAuthRoute
    };
  }
  let DefaultAuthenticatedImgOrButton = () => (
    <Fragment>
      <Button
        type="button"
        text="sign in"
        classNames="small-outline-button bg-transparent"
        id="/login"
        {...btnAttribute}
      />
      <Button
        type="button"
        text="sign up"
        classNames="small-button mr-0"
        id="/signup"
        {...btnAttribute}
      />
    </Fragment>
  );

  if (authenticated) {
    DefaultAuthenticatedImgOrButton = UserDefaultImage;
  }

  return (
    <Fragment>
      <AuthModal push={push} />
      <div className="container">
        <nav className="navbar navbar-light">
          <Brand />
          <div className="form-inline">
            <div className="d-none bukka-md-inline-flex">
              {buttonProps.map(propData => (
                <NavLink
                  text={propData.name}
                  key={propData.name}
                  classNames="bukka-btn"
                  href={propData.href}
                />
              ))}
            </div>
            <DefaultAuthenticatedImgOrButton />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  navigateToNextRoute: navAuthentication
})(BukkaAuthenticatedNav);

BukkaAuthenticatedNav.propTypes = {
  push: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  navigateToNextRoute: PropTypes.func.isRequired,
};

