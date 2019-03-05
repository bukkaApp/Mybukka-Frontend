import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '../container';
import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import MapMarker from '../icons/MapMarker';

import './LocationNavLargeScreen.scss';

const DeliveryOrPickupNav = ({ handleClick, isDeliveryorPickup }) => (
  <div className="options-content">
    <div aria-pressed="false" tabIndex="0" role="button" onClick={handleClick}>
      <h2 className="options-h2">
        {' '}
        <span>Delivery</span>{' '}
      </h2>
    </div>
    <span className="options-center-small">or</span>
    <div aria-pressed="false" tabIndex="0" role="button" onClick={handleClick}>
      <h2 className="options-h2">
        {' '}
        <span>Pickup</span>{' '}
      </h2>
    </div>

    <div
      style={{ left: isDeliveryorPickup ? '80px' : '0px' }}
      className="border-bottom"
    />
  </div>
);

const SuggestionsDropdown = () => (
  <div className="suggestion-dropdown">
    <SearchLocation
      chevronButtonVisible={false}
      showDeliveryOrPickupNav={false}
    />
  </div>
);

const ButtonText = () => (
  <Fragment>
    <span>
      <MapMarker />
    </span>
    <div>
      <h2 className="btn-location-h2">MarryLand</h2>
    </div>
  </Fragment>
);

const CurrentLocation = ({ handleClick }) => (
  <Button type="button" classNames="btn outline-none" handleClick={handleClick}>
    <ButtonText />
  </Button>
);

const LargeLocationNav = () => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);
  const [isDeliveryorPickup, setDeliveryorPickup] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(!isFocused);
  };

  const handleDeliveryorPickupClicked = () => {
    setDeliveryorPickup(!isDeliveryorPickup);
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
    <div ref={setWrapperRef} className="options-container d-sm-none d-md-block">
      <Container classNames="delivery-pickup-nav-feed">
        <div className="whole-center options-center col-lg-10">
          <div className="options-wrapper">
            <div className="options">
              <DeliveryOrPickupNav
                handleClick={handleDeliveryorPickupClicked}
                isDeliveryorPickup={isDeliveryorPickup}
              />

              <div title="vertical" className="divide" />
              <div className="btn-location">
                <CurrentLocation handleClick={handleClick} />

                {isFocused && (
                  <div className="search-container">
                    <div className="search-wrapper">
                      <SuggestionsDropdown handleClick={() => {}} />
                    </div>
                  </div>
                )}
              </div>
              {isDeliveryorPickup && (
                <div className="display-right">
                  <Button
                    type="button"
                    text="view Map"
                    classNames="small-button"
                    handleClick={() => {}}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LargeLocationNav;

SuggestionsDropdown.propTypes = {
  handleClick: PropTypes.func.isRequired
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired
};

DeliveryOrPickupNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDeliveryorPickup: PropTypes.bool.isRequired
};
