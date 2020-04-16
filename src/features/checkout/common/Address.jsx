/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';

import setSelectedLocation from 'Redux/setSelectedLocation';
import SuggestionsDropdown from 'Components/common-navs/SuggestionsDropdown';

import Input from 'Components/input/InputField';
import updateLocationsPrediction from '../../home/actionCreators/updateLocationsPrediction';

const Address = ({
  google,
  updatePredictions,
  selectedLocation,
  selectLocation,
  useCurrentLocationVisible,
  handleInputChange,
  propData,
}) => {
  let wrapperRef;
  const [inputData, setInputData] = useState(selectedLocation.description);
  const [isFocused, setFocus] = useState(false);

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus(false);
    }
  };

  const handleCollapse = (event) => {
    if (inputData && !inputData.contains(event.target)){
      setFocus(false)
    }
  }

  const displaySuggestions = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    }
    updatePredictions(predictions);
  };

  const handleChange = ({ target: { value } }) => {
    setInputData(value);
    handleInputChange({ target: { name: 'address', value } });
    const autoCompleteService = new google.maps.places.AutocompleteService();
    autoCompleteService.getPlacePredictions(
      { input: value },
      displaySuggestions
    );
  };

  const geoCodeLocation = (suggestion) => {
    const placeId = suggestion.place_id;
    setInputData(suggestion.description);
    setFocus(false);
    handleInputChange({ target: { name: 'address', value: suggestion.description } }); // eslint-disable-line
    const GeoCoder = new google.maps.Geocoder();
    GeoCoder.geocode({ placeId }, (response) => {
      const lattitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      const coordinates = [longitude, lattitude];
      selectLocation({ coordinates, suggestion });
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  return (
    <div ref={setWrapperRef}>
      <Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        defaultValue={selectedLocation ? selectedLocation.description : ''}
        value={inputData}
        handleFocus={() => setFocus(true)}
        label="Location"
        placeholderText="Enter your address..."
        id={propData.id}
        onClick = {handleCollapse}
      />
      <div className="dropdown-suggestion position-relative top__30n">
        {isFocused && (
          <Fragment>
            <SuggestionsDropdown
              reduceTextLength
              setLocation={geoCodeLocation}
              useCurrentLocationVisible={useCurrentLocationVisible}
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
    selectLocation: setSelectedLocation
  }
)(
  GoogleApiWrapper({
    apiKey: process.env.GOOGLE_API_KEY,
    v: '3'
  })(Address)
);

Address.defaultProps = {
  useCurrentLocationVisible: false,
  handleInputChange: () => {},
  propData: {}
};

Address.propTypes = {
  google: PropTypes.shape({}).isRequired,
  updatePredictions: PropTypes.func.isRequired,
  selectedLocation: PropTypes.shape({}).isRequired,
  selectLocation: PropTypes.func.isRequired,
  useCurrentLocationVisible: PropTypes.bool,
  handleInputChange: PropTypes.func,
  propData: PropTypes.objectOf({
    name: PropTypes.string,
  })
};
