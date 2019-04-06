import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import setDeliveryMode from './actionCreators/setDeliveryMode';
import Container from '../container';
import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import MapMarker from '../icons/MapMarker';

import './LocationNavLargeScreen.scss';

const DeliveryOrPickupNav = ({ mode, handleClick }) => (
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
        <div className="delivery-or-pickup-divider">or</div>
        <div
          className="delivery-or-pickup-mode"
          aria-pressed="false"
          tabIndex="0"
          role="button"
          onClick={() => handleClick('pickup')}
        >Pickup</div>
      </div>
      <div
        style={{ left: mode === 'pickup' ? '85px' : '2px' }}
        className="delivery-or-pickup-active"
      />
    </div>
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

const CurrentLocation = ({ handleClick, focus }) => (
  <div className="pr-17">
    <div className="position-relative">
      <div>
        <Button
          type="button"
          classNames="current-location-button"
          handleClick={handleClick}
        >
          <span className="current-location-button-icon">
            <MapMarker />
          </span>
          <div>
            <h2 className="current-location-button-text">MarryLand</h2>
          </div>
        </Button>
      </div>
      {focus && (
        <div className="search-container">
          <div className="search-wrapper">
            <SuggestionsDropdown handleClick={() => { }} />
          </div>
        </div>
      )}
    </div>
  </div>
);

const LocationNavLargeScreen = ({ mode, setDeliveryModeAction }) => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
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
    <div
      ref={setWrapperRef}
      className="location-navbar d-none d-sm-none d-md-block
      d-lg-block d-xl-block"
    >
      <Container classNames="location-navbar-content">
        <Container classNames="location-navbar-delivery-pickup-section">
          <div className="navbar-delivery-pickup">
            <DeliveryOrPickupNav
              handleClick={setDeliveryModeAction}
              mode={mode}
            />
            <div
              className="delivery-or-pickup-vertical-divider"
            />
            <CurrentLocation handleClick={handleClick} focus={isFocused} />
          </div>
        </Container>
        {mode === 'pickup' && (
          <div className="pr-15 location-navbar-view-map">
            <Button
              type="button"
              text="view Map"
              classNames="view-map"
              handleClick={() => {}}
            />
          </div>
        )}
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
)(LocationNavLargeScreen);

LocationNavLargeScreen.propTypes = {
  mode: PropTypes.string.isRequired,
  setDeliveryModeAction: PropTypes.bool.isRequired
};


CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

DeliveryOrPickupNav.propTypes = {
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.bool.isRequired
};
