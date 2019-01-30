import React from 'react';
import PropTypes from 'prop-types';

import LocationArrow from '../icons/LocationArrow';

import './usecurrentlocation.scss';

const UseCurrentLocation = ({ handleClick }) => (
  <div
    className="suggestion-geo-group input-group"
    onClick={handleClick}
    tabIndex={0}
    role="link"
  >
    <div className="input-group-prepend">
      <span className="input-group-text location-arrow">
        <LocationArrow />
      </span>
    </div>
    <h4 className="suggestion text-center d-block">Use current location</h4>
  </div>
);

export default UseCurrentLocation;

UseCurrentLocation.defaultProps = {
  handleClick: () => {},
};

UseCurrentLocation.propTypes = {
  handleClick: PropTypes.func,
};
