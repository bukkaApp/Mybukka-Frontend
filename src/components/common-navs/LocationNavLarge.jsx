import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import InputField from 'Components/input/InputField';
import setDeliveryMode from './actionCreators/setDeliveryMode';
import Container from '../container';
import Button from '../button/Button';
import MapMarker from '../icons/MapMarker';
import SearchLocation from './SearchLocation';
import Cart from '../icons/Cart';
import Magnifier from '../icons/Magnifier';
import ChevronVertical from '../icons/ChevronVertical';
import Duration from './Duration';
import { ReusableButton, ReusableDropdown, ReusableWrapper }
  from './ReusableNavElements';

import './locationnavlarge.scss';

const Delivery = ({ mode, handleClick }) => (
  <div className="pr-17">
    <div className="position-relative">
      <div className="delivery-or-pickup">
        <div
          className="delivery-or-pickup-mode"
          aria-pressed="false"
          tabIndex="0"
          role="button"
          onClick={() => handleClick('delivery')}
        >Delivery</div>
      </div>
      <div
        style={{ left: mode === 'pickup' ? '85px' : '2px' }}
        className="delivery-or-pickup-active"
      />
    </div>
  </div>
);

const SearchInputField = () => (
  <InputField
    type="text"
    name="searchLocation"
    placeholderText="Enter your address..."
    classNames="text-field form-control searchlocation"
    // handleFocus={() => setFocus(true)}
    handleChange={() => {}}
    defaultValue={''}
  />
);

const CurrentLocation = props => (
  <ReusableWrapper>
    <ReusableButton classNames="custom-current-loc" {...props}>
      <span className="current-location-button-icon mr-0">
        <MapMarker />
      </span>
      <div>
        <h2 className={`current-location-button-text ml-1 ${props.focus ?
          'current-loc-h2-text-active' : 'current-loc-h2-text'}`}
        >MarryLand</h2>
      </div>
    </ReusableButton>
    <ReusableDropdown classNames={`${props.focus ? '' : 'dropdown--disapear'}`}>
      <SearchLocation
        chevronButtonVisible={false}
        showDeliveryOrPickupNav={false}
      />
    </ReusableDropdown>
  </ReusableWrapper>
);

const Categories = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <div>
        <h2 className="current-location-button-text">Categories</h2>
      </div>
      <span className="current-location-button-icon custom-mt-minus1 pl-4">
        <ChevronVertical />
      </span>
    </ReusableButton>
  </ReusableWrapper>
);

const Search = props => (
  <ReusableWrapper>
    <ReusableButton {...props}>
      <span className="current-location-button-icon custom-mt-minus19">
        <Magnifier />
      </span>
      <div>
        <div className="current-location-button-text">
          <SearchInputField handleClick={() => { }} />
        </div>
      </div>
    </ReusableButton>
  </ReusableWrapper>
);

const LocationNavLarge = ({ mode, setDeliveryModeAction }) => {
  let wrapperRef;
  const unFocus = {
    location: false,
    duration: false,
    categories: false,
    search: false
  };

  const [isFocused, setFocus] = useState({
    location: false,
    duration: false,
    categories: false,
    search: false
  });

  const handleClick = (name) => {
    setFocus({
      ...isFocused,
      [name]: true
    });
  };

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus({
        ...isFocused,
        ...unFocus
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div
      ref={setWrapperRef}
      className="location-navbar d-none d-sm-none d-md-block
      d-lg-block d-xl-block"
    >
      <Container classNames="location-navbar-content">
        <Container classNames="location-navbar-delivery-pickup-section">
          <div className="navbar-delivery-pickup">
            {!isFocused.search &&
            <Fragment>
              <Delivery
                handleClick={setDeliveryModeAction}
                mode={mode}
              />
              <div
                className="delivery-or-pickup-vertical-divider"
              />
              <CurrentLocation
                handleClick={() => handleClick('location')}
                focus={isFocused.location}
              />
              <div
                className="delivery-or-pickup-vertical-divider"
              />
              <Duration
                handleClick={() => handleClick('duration')}
                focus={isFocused.duration}
              />
              <div
                className="delivery-or-pickup-vertical-divider"
              />
              <Categories
                handleClick={() => handleClick('categories')}
                focus={isFocused.categories}
              />
              <div
                className="delivery-or-pickup-vertical-divider"
              />
            </Fragment>
            }
            <Search
              handleClick={() => handleClick('search')}
              focus={isFocused.search}
            />
          </div>
        </Container>
        <div className="pr-15 location-navbar-view-map">
          <Button
            type="button"
            classNames="cart-button border"
            handleClick={() => {}}
          >
            <span className="cart-icon"><Cart /></span>
            <span
              className="cart-divider"
            />
            0 cart
          </Button>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ deliveryModeReducer: { mode } }) => ({
  mode
});

export default connect(
  mapStateToProps,
  { setDeliveryModeAction: setDeliveryMode }
)(LocationNavLarge);

LocationNavLarge.propTypes = {
  mode: PropTypes.string.isRequired,
  setDeliveryModeAction: PropTypes.bool.isRequired
};

Delivery.propTypes = {
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.bool.isRequired
};
