import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

import './SuggestionsDropdown.scss';

const SuggestionsDropdown = ({
  setLocation,
  predictions,
  useCurrentLocationVisible,
}) => (
  <div className="suggestion-dropdown">
    {useCurrentLocationVisible &&
      <UseCurrentLocation />
    }
    <GeoSuggestions
      handleClick={setLocation}
      predictions={predictions}
    />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  useCurrentLocationVisible: true,
};

SuggestionsDropdown.propTypes = {
  setLocation: PropTypes.func.isRequired,
  useCurrentLocationVisible: PropTypes.bool
};
