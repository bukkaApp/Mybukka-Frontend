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
import changeAuthenticationPageAction from './actionCreators/changeAuthenticationPage';
import fetchBukkasAction from '../../features/feed/actionCreators/fetchBukkas';
import getPromotedBukkasAction from '../../features/feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../../features/feed/actionCreators/getRestaurantCuisineAction';

import './bukka-authenticated-nav.scss';
import SearchAnything from '../search/SearchAnything';
import CartScene from '../cart/CartScene';
import { useModalContext } from '../../context/UseModal';

const buttonProps = [
  { name: 'Food', href: '/feed' },
  { name: 'Fresh', href: '/fresh' },
  { name: 'Mart', href: '/mart' }
];


const BukkaAuthenticatedNav = ({
  status,
  changeAuthenticationPage,
  fetchNearbyBukkas,
  getPromotedBukkas,
  getRestaurantCuisine,
  fetchNearbyFreshOrMart,
}) => {
  const { setAuthenticationPopup, setModal } = useModalContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const isMobileScreen = useMediaQuery({ minWidth: 767 });
  const { coordinates } = useLocationContext();

  const btnAtrributes = [{ type: 'button', text: 'sign in', classNames: 'small-outline-button bg-transparent', id: '/login' }, { type: 'button', text: 'sign up', classNames: 'small-button mr-0', id: '/signup' }];
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
        .then(() => push('/feed', { hasFetched: true }));
    } else {
      const type = href === '/fresh' ? 'fresh' : 'mart';
      new Promise(async (resolve) => {
        resolve(fetchNearbyFreshOrMart(coordinates, type));
      }).then(() => push(href, { hasFetched: true }));
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

  const emitOnClickOnMobile = ({ target: { id } }) => {
    // push to signin or signup pages on mobile
    push(id);
  };

  const emitOnClickOnDesktop = ({ target: { id } }) => {
    // toggle to signin or signup on destop using modal
    changeAuthenticationPage(id);
    setAuthenticationPopup(true);
    setModal(true);
  };

  let AuthScene = () => (
    <Fragment>
      {btnAtrributes.map(btnProp =>
        (<Button
          type={btnProp.type}
          text={btnProp.text}
          classNames={btnProp.classNames}
          id={btnProp.id}
          handleClick={isMobileScreen ? emitOnClickOnDesktop : emitOnClickOnMobile}
        />))}
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
    changeAuthenticationPage: changeAuthenticationPageAction,
    fetchNearbyBukkas: fetchBukkasAction,
    getPromotedBukkas: getPromotedBukkasAction,
    getRestaurantCuisine: getRestaurantCuisineAction,
    fetchNearbyFreshOrMart: fetchFreshOrMartAction
  }
)(BukkaAuthenticatedNav);

BukkaAuthenticatedNav.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  changeAuthenticationPage: PropTypes.func.isRequired
};
