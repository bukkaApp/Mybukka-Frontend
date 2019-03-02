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
import Duration from './Duration';
import CartDropdown from './CartIconSection';
import {
  ReusableButton,
  ReusableDropdown,
  ReusableWrapper
} from './ReusableNavElements';

import setCheckoutMode from './actionCreators/setCheckoutMode';

import inputData from './inputData/duration';

import './locationnavlarge.scss';

const { categoryItems } = inputData;

const DeliveryOrPickUp = ({ mode, handleClick, deliveryorpickup }) => (
  <div className="pr-17">
    <div className="position-relative">
      <div className="delivery-or-pickup">
        <div
          className="delivery-or-pickup-mode"
          aria-pressed="false"
          tabIndex="0"
          role="button"
          onClick={() => handleClick('delivery')}
        >
          Delivery
        </div>
        {deliveryorpickup && (
          <Fragment>
            <div className="delivery-or-pickup-divider">or</div>
            <div
              className="delivery-or-pickup-mode"
              aria-pressed="false"
              tabIndex="0"
              role="button"
              onClick={() => handleClick('pickup')}
            >
              Pickup
            </div>
          </Fragment>
        )}
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
    placeholderText="Search items..."
    classNames="text-field form-control searchlocation"
    // handleFocus={() => setFocus(true)}
    handleChange={() => {}}
    defaultValue={''}
  />
);

const CurrentLocation = ({ selectedLocation, focus }) => (
  <ReusableWrapper>
    <ReusableButton
      classNames="custom-current-loc"
      selectedLocation={selectedLocation}
      focus={focus}
    >
      <span className="current-location-button-icon mr-0">
        <MapMarker />
      </span>
      <div>
        <h2
          className={`current-location-button-text ml-1 ${
            focus ? 'current-loc-h2-text-active' : 'current-loc-h2-text'
          }`}
        >
          {Object.keys(selectedLocation).length > 0
            ? selectedLocation.structured_formatting.main_text
            : 'Current Location'}
        </h2>
      </div>
    </ReusableButton>
    <ReusableDropdown classNames={`${focus ? '' : 'dropdown--disapear'}`}>
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
    <ReusableDropdown
      classNames={`${props.focus ? 'border-none' : 'dropdown--disapear'}`}
    >
      <CategoryLists
        handleClick={() => {}}
        lists={categoryItems}
        classNames="category-dropdown-section"
        maxHeight="category-dropdown-height"
      />
    </ReusableDropdown>
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
          <SearchInputField handleClick={() => {}} />
        </div>
      </div>
    </ReusableButton>
  </ReusableWrapper>
);

const LocationNavLarge = ({
  mode,
  handleCheckoutMode,
  setDeliveryModeAction,
  classNames,
  deliveryorpickup,
  scheduleTime,
  cartItemsQuantity,
  selectedLocation
}) => {
  let wrapperRef;
  const unFocus = {
    location: false,
    duration: false,
    categories: false,
    search: false,
    cart: false,
  };
  const [isFocused, setFocus] = useState({
    location: false,
    duration: false,
    categories: false,
    search: false,
    cart: false
  });

  const handleClick = (name) => {
    setFocus({
      ...unFocus,
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
    if (!deliveryorpickup && mode !== 'delivery') {
      setDeliveryModeAction('delivery');
    }
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div
      ref={setWrapperRef}
      className={`location-navbar d-none d-sm-none d-md-block
      d-lg-block d-xl-block ${classNames}`}
    >
      <Container classNames="location-navbar-content">
        <Container classNames="pl-0 location-navbar-delivery-pickup-section">
          <div className="navbar-delivery-pickup">
            {!isFocused.search && (
              <Fragment>
                <DeliveryOrPickUp
                  handleClick={setDeliveryModeAction}
                  mode={mode}
                  deliveryorpickup={deliveryorpickup}
                />
                <div className="delivery-or-pickup-vertical-divider" />
                <CurrentLocation
                  handleClick={() => handleClick('location')}
                  focus={isFocused.location}
                  selectedLocation={selectedLocation}
                />
                <div className="delivery-or-pickup-vertical-divider" />
                {scheduleTime && (
                  <Fragment>
                    <Duration
                      handleClick={() => handleClick('duration')}
                      focus={isFocused.duration}
                    />
                    <div className="delivery-or-pickup-vertical-divider" />
                  </Fragment>
                )}
                <Categories
                  handleClick={() => handleClick('categories')}
                  focus={isFocused.categories}
                />
                <div className="delivery-or-pickup-vertical-divider" />
              </Fragment>
            )}
            <Search
              handleClick={() => handleClick('search')}
              focus={isFocused.search}
              handleChange={handleSearch}
            />
          </div>
        </Container>
        <div className="location-navbar-view-map">
          <div className="position-relative">
            <Button
              type="button"
              classNames="cart-button border"
              handleClick={() => handleClick('cart')}
            >
              <span className="cart-icon">
                <Cart />
              </span>
              <span className="cart-divider" />
              {cartItemsQuantity} cart
            </Button>
            <CartDropdown
              handleClick={handleCheckoutMode}
              focus={isFocused.cart}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  cartReducer: { items },
  selectedLocationReducer: { selectedLocation }
}) => ({
  mode,
  cartItemsQuantity: items.length,
  selectedLocation
});

export default connect(
  mapStateToProps,
  {
    setDeliveryModeAction: setDeliveryMode,
    handleCheckoutMode: setCheckoutMode
  }
)(LocationNavLarge);

LocationNavLarge.defaultProps = {
  classNames: '',
  deliveryorpickup: false,
  scheduleTime: false
};

LocationNavLarge.propTypes = {
  cartItemsQuantity: PropTypes.number.isRequired,
  scheduleTime: PropTypes.bool,
  classNames: PropTypes.string,
  deliveryorpickup: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  handleCheckoutMode: PropTypes.func.isRequired,
  setDeliveryModeAction: PropTypes.func.isRequired,
  handleSearch: PropTypes.func,
};

CurrentLocation.propTypes = {
  focus: PropTypes.bool.isRequired
};

Categories.propTypes = {
  focus: PropTypes.bool.isRequired
};

DeliveryOrPickUp.propTypes = {
  deliveryorpickup: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

SearchInputField.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
