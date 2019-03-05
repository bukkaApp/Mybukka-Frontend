import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import NavLink from '../navlink/Navlink';
import UserDefaultImage from './UserDefaultImage';
import './navbar.scss';

const buttonProps = [{ name: 'Food' }, { name: 'Fresh' }, { name: 'Drinks' }];

const BukkaAuthenticatedNav = ({ push }) => {
  const { authenticated } = status;
  let DefaultAuthenticatedImgOrButton = () => (
    <Fragment>
      <Button
        type="button"
        text="sign in"
        handleClick={() => push('/login')}
        classNames="small-outline-button bg-transparent"
      />
      <Button
        type="button"
        text="sign up"
        classNames="small-button"
        handleClick={() => push('/signup')}
      />
    </Fragment>
  );
  if (authenticated) {
    DefaultAuthenticatedImgOrButton = UserDefaultImage;
  }
  return (
    <Fragment>
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
                  href="/"
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

export default BukkaAuthenticatedNav;

BukkaAuthenticatedNav.propTypes = {
  push: PropTypes.func.isRequired,
};

