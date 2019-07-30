import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';

import setSelectedLocation from 'Redux/setSelectedLocation';
import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import InputField from 'Components/input/InputField';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from 'Components/common-navs/SuggestionsDropdown';
import fetchBukkas from '../../features/feed/actionCreators/fetchBukkas';

import updateLocationsPrediction from '../../features/home/actionCreators/updateLocationsPrediction';

import './searchlocation.scss';

const SearchLocation = ({
  google,
  updatePredictions,
  selectedLocation,
  selectLocation,
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
  coordinates,
  fetchNearbyBukkas,
}) => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);

  const setWrapperRef = node => {
    wrapperRef = node;
  };

  const handleClickOutside = event => {
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
      const autoCompleteService = new google.maps.places.AutocompleteService();
      autoCompleteService.getPlacePredictions(
        { input: value },
        displaySuggestions,
      );
    }
  };

  const geoCodeLocation = suggestion => {
    const placeId = suggestion.place_id;
    const GeoCoder = new google.maps.Geocoder();
    GeoCoder.geocode({ placeId }, response => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      selectLocation({ coordinates, suggestion });
    });
  };

  const showChevronButton = () => {
    if (chevronButtonVisible) {
      return (
        <Link to="" onClick={() => fetchNearbyBukkas(coordinates)}>
          <div className="input-group-append button-go-feed">
            <span className="input-group-text button-search">
              <ChevronRight />
            </span>
          </div>
        </Link>
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
          defaultValue={selectedLocation ? selectedLocation.description : ''}
        />
        {showChevronButton()}
      </div>
      {showDropdown && <div className="carousel-divider mb-0" />}
      <div className="dropdown-suggestion">
        {(isFocused || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown setLocation={geoCodeLocation} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  locationsPredictionReducer: { predictions },
  selectedLocationReducer: { selectedLocation, coordinates },
}) => ({
  predictions,
  selectedLocation,
  coordinates,
});

export default connect(
  mapStateToProps,
  {
    updatePredictions: updateLocationsPrediction,
    selectLocation: setSelectedLocation,
    fetchNearbyBukkas: fetchBukkas,
  },
)(
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_API_KEY,
    v: '3',
  })(SearchLocation),
);

SearchLocation.defaultProps = {
  chevronButtonVisible: true,
  showDeliveryOrPickupNav: true,
};

SearchLocation.propTypes = {
  showDropdown: PropTypes.bool,
  google: PropTypes.shape({}).isRequired,
  updatePredictions: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
  chevronButtonVisible: PropTypes.bool,
  showDeliveryOrPickupNav: PropTypes.bool,
};
