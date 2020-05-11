/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { useMediaQuery } from 'react-responsive';
import fetchFreshOrMartAction from 'Redux/fetchFreshOrMartAction';
import Magnifier from 'Icons/Magnifier';
import { useLocationContext } from '../../context/LocationContext';
import Button from '../button/Button';
import Brand from '../brand/Brand';
import NavLink from '../navlink/Navlink';
import UserDefaultImage from './common/UserDefaultImage';
import navAuthentication from './actionCreators/navAuthentication';
import fetchBukkasAction from '../../features/feed/actionCreators/fetchBukkas';
import getPromotedBukkasAction from '../../features/feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../../features/feed/actionCreators/getRestaurantCuisineAction';

import './bukka-authenticated-nav.scss';
import SearchAnything from '../search/SearchAnything';
import CartScene from '../cart/CartScene';

const buttonProps = [
  { name: 'Food', href: '/feed' },
  { name: 'Fresh', href: '/fresh' },
  { name: 'Mart', href: '/mart' }
];


const BukkaAuthenticatedNav = ({
  status,
  navigateToNextRoute,
  fetchNearbyBukkas,
  getPromotedBukkas,
  getRestaurantCuisine,
  fetchNearbyFreshOrMart,
}) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const { coordinates } = useLocationContext();

  const wrapperRef = React.createRef();
  const { push } = useHistory();
  const { authenticated } = status;

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

  const fetchPageApis = (e, href) => {
    e.preventDefault();
    if (href === '/feed') {
      new Promise(async (resolve) => {
        resolve(getPromotedBukkas(coordinates));
      }).then(() => getRestaurantCuisine(coordinates))
        .then(() => fetchNearbyBukkas(coordinates))
        .then(() => push('/feed'));
    } else {
      const type = href === '/fresh' ? 'fresh' : 'mart';
      new Promise(async (resolve) => {
        resolve(fetchNearbyFreshOrMart(coordinates, type));
      }).then(() => push(href));
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus({ ...defaultProps });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        {isBigScreen && <CartScene />}
      </Fragment>
    );
  }

  return (
    <nav ref={wrapperRef} className="container navbar navbar-light">
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
        <div ref={wrapperRef} className="form-inline">
          <div className="d-none bukka-md-inline-flex">
            {buttonProps.map(propData => (
              <NavLink
                text={propData.name}
                onClick={e => fetchPageApis(e, propData.href)}
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
    navigateToNextRoute: navAuthentication,
    fetchNearbyBukkas: fetchBukkasAction,
    getPromotedBukkas: getPromotedBukkasAction,
    getRestaurantCuisine: getRestaurantCuisineAction,
    fetchNearbyFreshOrMart: fetchFreshOrMartAction
  }
)(BukkaAuthenticatedNav);

BukkaAuthenticatedNav.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  navigateToNextRoute: PropTypes.func.isRequired
};
