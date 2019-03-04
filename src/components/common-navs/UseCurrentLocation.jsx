import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SmallSpinner from 'Components/spinners/SmallSpinner';
import setSelectedLocation from 'Redux/setSelectedLocation';
import LocationArrow from '../icons/LocationArrow';

import './usecurrentlocation.scss';

const UseCurrentLocation = ({ selectLocation }) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const setLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lattitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = [longitude, lattitude];
          selectLocation(coordinates, true);
        },
        () => {
          setIsGettingLocation(false);
          console.log('the geolocation service has failed');
        }
      );
    } else {
      // Browser doesn't support Geolocation
      setIsGettingLocation(false);
      console.log('the geolocation service is not supported in your browser');
    }
  };

  return (
    <div
      className="suggestion-geo-group input-group"
      onClick={setLocation}
      tabIndex={0}
      role="link"
    >
      <div className="input-group-prepend">
        <span className="input-group-text location-arrow spinner-loading">
          {isGettingLocation ? <SmallSpinner /> : <LocationArrow />}
        </span>
      </div>
      <h4 className="suggestion text-center d-block">Use current location</h4>
    </div>
  );
};

export default connect(
  () => ({}),
  { selectLocation: setSelectedLocation }
)(UseCurrentLocation);

UseCurrentLocation.propTypes = {
  selectLocation: PropTypes.func.isRequired
};
