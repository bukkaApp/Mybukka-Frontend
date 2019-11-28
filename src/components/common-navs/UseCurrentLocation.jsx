/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SmallSpinner from 'Components/spinners/SmallSpinner';
import setSelectedLocation from 'Redux/setSelectedLocation';
import LocationArrow from '../icons/LocationArrow';

import getPromotedBukkas from '../../features/feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../../features/feed/actionCreators/getRestaurantCuisineAction';
import fetchBukkas from '../../features/feed/actionCreators/fetchBukkas';
import './usecurrentlocation.scss';

const UseCurrentLocation = ({
  selectLocation,
  fetchNearbyBukkas,
  push,
  fetchedPromotedBukkas,
  getRestaurantCuisine,
}) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const setLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lattitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = [longitude, lattitude];
          setIsGettingLocation(false);
          selectLocation(coordinates, true);
          new Promise((resolve) => {
            resolve(fetchedPromotedBukkas(coordinates));
          }).then(() => getRestaurantCuisine(coordinates))
            .then(() => fetchNearbyBukkas(coordinates, push))
            .then(() => push('/feed'));
        },
        () =>
          setIsGettingLocation(false)
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
  {
    selectLocation: setSelectedLocation,
    fetchNearbyBukkas: fetchBukkas,
    fetchedPromotedBukkas: getPromotedBukkas,
    getRestaurantCuisine: getRestaurantCuisineAction,
  }
)(UseCurrentLocation);

UseCurrentLocation.propTypes = {
  selectLocation: PropTypes.func.isRequired
};
