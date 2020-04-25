import React from 'react';
import SmallSpinner from 'Components/spinners/SmallSpinner';
import LocationArrow from '../icons/LocationArrow';

import { useLocationContext } from '../../context/LocationContext';
import './usecurrentlocation.scss';

const UseCurrentLocation = () => {
  const { setCurrentLocation, loading } = useLocationContext();
  return (
    <div
      className="suggestion-geo-group input-group"
      onClick={setCurrentLocation}
      tabIndex={0}
      role="link"
    >
      <div className="input-group-prepend">
        <span className="input-group-text location-arrow spinner-loading">
          {loading ? <SmallSpinner /> : <LocationArrow />}
        </span>
      </div>
      <h4 className="suggestion text-center d-block">Use current location</h4>
    </div>
  );
};

export default UseCurrentLocation;

UseCurrentLocation.propTypes = {};
