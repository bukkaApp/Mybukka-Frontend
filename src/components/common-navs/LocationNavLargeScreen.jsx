import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useLocationContext } from '../../context/LocationContext';
import setDeliveryMode from './actionCreators/setDeliveryMode';
import Container from '../container';
import Button from '../button/Button';
import SearchLocation from '../places-suggest/SearchLocation';
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
        >
          Delivery
        </div>
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
      reduceSuggestionText
    />
  </div>
);

const CurrentLocation = ({ handleClick, focus, }) => {
  const { selectedLocation } = useLocationContext();

  return (
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
              <h2 className="current-location-button-text">
                {Object.keys(selectedLocation).length > 0
                  ? selectedLocation.structured_formatting.secondary_text.split(',')[0]
                  : 'Current Location'}
              </h2>
            </div>
          </Button>
        </div>
        {focus && (
          <div className="search-container">
            <div className="search-wrapper">
              <SuggestionsDropdown />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LocationNavLargeScreen = ({
  mode,
  setDeliveryModeAction,
  handleMapClick,
}) => {
  const wrapperRef = React.createRef();
  const [isFocused, setFocus] = useState(false);
  const [showMap, setMapDisplay] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(!isFocused);
  };

  const handleMap = () => {
    setMapDisplay(!showMap);
    handleMapClick();
  };

  const handleDeliveryorPickup = (status) => {
    if (showMap) {
      handleMap();
    }
    setDeliveryModeAction(status);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div
      ref={wrapperRef}
      className="location-navbar d-none d-sm-none d-md-block
      d-lg-block d-xl-block"
    >
      <Container classNames="location-navbar-content">
        <div classNames="location-navbar-delivery-pickup-section">
          <div className="navbar-delivery-pickup">
            <DeliveryOrPickupNav
              handleClick={handleDeliveryorPickup}
              mode={mode}
            />
            <div className="delivery-or-pickup-vertical-divider" />
            <CurrentLocation
              handleClick={handleClick}
              focus={isFocused}
            />
          </div>
        </div>
        {mode === 'pickup' && (
          <div className="location-navbar-view-map">
            <Button
              type="button"
              text={showMap ? 'view List' : 'view Map'}
              classNames="view-map"
              handleClick={handleMap}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
}) => ({
  mode,
});

export default connect(
  mapStateToProps,
  { setDeliveryModeAction: setDeliveryMode }
)(LocationNavLargeScreen);

LocationNavLargeScreen.defaultProps = {
  handleMapClick: () => {}
};

LocationNavLargeScreen.propTypes = {
  handleMapClick: PropTypes.func,
  mode: PropTypes.string.isRequired,
  setDeliveryModeAction: PropTypes.func.isRequired
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

DeliveryOrPickupNav.propTypes = {
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};
