import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import setDeliveryMode from './actionCreators/setDeliveryMode';
import Container from '../container';
import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import MapMarker from '../icons/MapMarker';

import './LocationNavLargeScreen.scss';

const DeliveryOrPickupNav = ({ mode, handleClick }) => (
  <div className="options-content">
    <div
      aria-pressed="false"
      tabIndex="0"
      role="button"
      onClick={() => handleClick('delivery')}
    >
      <h2 className="options-h2">
        {' '}
        <span>Delivery</span>{' '}
      </h2>
    </div>
    <span className="options-center-small">or</span>
    <div
      aria-pressed="false"
      tabIndex="0"
      role="button"
      onClick={() => handleClick('pickup')}
    >
      <h2 className="options-h2">
        {' '}<span>Pickup</span>{' '}
      </h2>
    </div>

    <div
      style={{ left: mode === 'pickup' ? '80px' : '0px' }}
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

const LocationButton = () => (
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
    <LocationButton />
  </Button>
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
      className="options-container d-sm-none d-md-block"
    >
      <Container classNames="delivery-pickup-nav-feed">
        <div className="whole-center options-center col-lg-10">
          <div className="options-wrapper">
            <div className="options">
              <DeliveryOrPickupNav
                handleClick={setDeliveryModeAction}
                mode={mode}
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
              {mode === 'pickup' && (
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
  handleClick: PropTypes.func.isRequired
};

DeliveryOrPickupNav.propTypes = {
  mode: PropTypes.string.isRequired,
  handleClick: PropTypes.bool.isRequired
};
