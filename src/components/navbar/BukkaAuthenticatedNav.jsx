import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Magnifier from 'Icons/Magnifier';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import NavLink from '../navlink/Navlink';
import UserDefaultImage from './UserDefaultImage';
import selectAuthForm from './actionCreators/selectAuthForm';
import CartSection from './CartSection';
import EmptyCart, { CartDropdown } from './EmptyCart';
import CartIconSection from '../common-navs/CartIconSection';

import './bukka-authenticated-nav.scss';
import SearchAnything from '../common/SearchAnything';

const buttonProps = [
  { name: 'Food', href: '/feed' },
  { name: 'Fresh', href: '/fresh' },
  { name: 'Drinks', href: '/drinks' }
];

const CartScene = () => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);

  const handleClick = () => {
    setFocus(!isFocused);
  };

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className="position-relative">
      <div>
        <CartSection handleClick={() => handleClick('cart')} />
      </div>
      <div ref={setWrapperRef}>
        <CartDropdown display={isFocused}>
          <EmptyCart />
          <CartIconSection />
        </CartDropdown>
      </div>
    </div>
  );
};

const BukkaAuthenticatedNav = ({ push, status, navigateToNextRoute }) => {
  const { authenticated } = status;
  let wrapperRef;

  const defaultProps = {
    search: false,
    searchBtn: false
  };

  const [isFocused, setFocus] = useState({
    search: false,
    searchBtn: false
  });

  const handleClick = (name) => {
    setFocus({
      ...defaultProps,
      [name]: true
    });
  };

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus({ ...defaultProps });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

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
      dataTarget: '#authModal',
      handleClick: goToAuthRoute
    };
  }
  let AuthScene = () => (
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
    AuthScene = () => (
      <Fragment>
        <div
          className="pb-3 mx-3 icon d-lg-none"
        >
          <span
            tabIndex="0"
            aria-pressed="false"
            role="button"
            onClick={() => handleClick('searchBtn')}
          >
            <Magnifier />
          </span>
        </div>
        <UserDefaultImage />
        <CartScene />
      </Fragment>
    );
  }

  return (
    <nav ref={setWrapperRef} className="container navbar navbar-light">
      <div className="row mx-0">
        {!isFocused.searchBtn &&
          <Brand />
        }
        <div className={`pl-lg-5
              ${isFocused.searchBtn ? ''
      : 'd-none d-md-none d-lg-inline-flex'}`}
        >
          <SearchAnything
            handleClick={
              isFocused.searchBtn ?
                () => {}
                : () => handleClick('search')
            }
            focus={
              isFocused.searchBtn ?
                isFocused.searchBtn
                : isFocused.search
            }
          />
        </div>
      </div>
      {!isFocused.searchBtn &&
        <div ref={setWrapperRef} className="form-inline">
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
          <AuthScene />
        </div>
      }
    </nav>
  );
};

export default connect(
  null,
  {
    navigateToNextRoute: selectAuthForm
  }
)(BukkaAuthenticatedNav);

BukkaAuthenticatedNav.propTypes = {
  push: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  navigateToNextRoute: PropTypes.func.isRequired
};
