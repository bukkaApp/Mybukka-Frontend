/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';

import showLoadingAction from 'Redux/showLoadingAction';
import setSelectedLocation from 'Redux/setSelectedLocation';
import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import InputField from 'Components/input/InputField';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from 'Components/common-navs/SuggestionsDropdown';

import updateLocationsPrediction from '../../features/home/actionCreators/updateLocationsPrediction';

import fetchBukkas from '../../features/feed/actionCreators/fetchBukkas';
import getPromotedBukkas from '../../features/feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../../features/feed/actionCreators/getRestaurantCuisineAction';
import './searchlocation.scss';

const SearchLocation = ({
  google,
  updatePredictions,
  selectedLocation,
  selectLocation,
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
  fetchNearbyBukkas,
  push,
  handleLoader,
  fetchedPromotedBukkas,
  getRestaurantCuisine,
}) => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);
  const [inputData, setInputData] = useState('');

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus(false);
    }
  };

  const displaySuggestions = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    updatePredictions(predictions);
  };

  const handleChange = ({ target: { value } }) => {
    if (value) {
      setInputData(value);
      const autoCompleteService = new google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: value },
        displaySuggestions
      );
    }
  };

  const geoCodeLocation = (suggestion) => {
    const placeId = suggestion.place_id;
    const GeoCoder = new google.maps.Geocoder();
    GeoCoder.geocode({ placeId }, async (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      setInputData(suggestion.description);
      selectLocation({ coordinates, suggestion });
      setFocus(false);
      new Promise((resolve) => {
        resolve(fetchedPromotedBukkas(coordinates));
      }).then(() => getRestaurantCuisine(coordinates))
        .then(() => fetchNearbyBukkas(coordinates, push))
        .then(() => push('/feed'));
    });
  };

  const handlePredictions = (suggestions) => {
    if (suggestions.length > 0) {
      geoCodeLocation(suggestions[0]);
    }
  };

  const handleSuggestion = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    handlePredictions(predictions);
  };

  const handleChevronSelectedLocation = () => {
    if (inputData || selectedLocation.description) {
      handleLoader();
      const autoCompleteService = new google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: inputData || selectedLocation.description },
        handleSuggestion
      );
    }
  };

  const handleChevronClick = () => {
    handleChevronSelectedLocation();
  };

  const showChevronButton = () => {
    if (chevronButtonVisible) {
      return (
        <div
          onClick={handleChevronClick}
          aria-pressed="false"
          tabIndex="0"
          role="button"
          className="input-group-append button-go-feed"
        >
          <span className="input-group-text button-search">
            <ChevronRight />
          </span>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div ref={setWrapperRef}>
      <div
        className="input-group address-input-section"
        style={{ border: '1 px solid #eceff1' }}
      >
        <div className="input-group-prepend">
          <span className="input-group-text location-marker">
            <MapMarker />
          </span>
        </div>
        <InputField
          type="text"
          name="searchLocation"
          placeholderText="Enter your address..."
          classNames="text-field form-control searchlocation"
          handleFocus={() => setFocus(true)}
          handleChange={handleChange}
          value={inputData}
          defaultValue={selectedLocation ? selectedLocation.description : ''}
        />
        {showChevronButton()}
      </div>
      {showDropdown && (<div className="carousel-divider mb-0" />)}
      <div className="dropdown-suggestion">
        {(isFocused || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              push={push}
              setLocation={geoCodeLocation}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  locationsPredictionReducer: { predictions },
  selectedLocationReducer: { selectedLocation }
}) => ({
  predictions,
  selectedLocation
});

export default connect(
  mapStateToProps,
  {
    updatePredictions: updateLocationsPrediction,
    selectLocation: setSelectedLocation,
    fetchNearbyBukkas: fetchBukkas,
    handleLoader: showLoadingAction,
    fetchedPromotedBukkas: getPromotedBukkas,
    getRestaurantCuisine: getRestaurantCuisineAction,
  }
)(
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_API_KEY,
    v: '3'
  })(SearchLocation)
);

SearchLocation.defaultProps = {
  chevronButtonVisible: true,
  showDeliveryOrPickupNav: true,
  showDropdown: false,
  reduceSuggestionText: false,
  fetchedPromotedBukkas: () => {}
};

SearchLocation.propTypes = {
  fetchedPromotedBukkas: PropTypes.func,
  showDropdown: PropTypes.bool,
  handleLoader: PropTypes.func.isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  google: PropTypes.shape({}).isRequired,
  updatePredictions: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
  chevronButtonVisible: PropTypes.bool,
  showDeliveryOrPickupNav: PropTypes.bool,
  reduceSuggestionText: PropTypes.bool,
};
