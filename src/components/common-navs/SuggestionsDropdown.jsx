import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({ setLocation, push, reduceTextLength }) => (
  <div className="suggestion-dropdown">
    <UseCurrentLocation push={push} />
    <GeoSuggestions
      handleClick={setLocation}
      reduceTextLength={reduceTextLength}
    />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  push: () => {},
  reduceTextLength: false,
};

SuggestionsDropdown.propTypes = {
  setLocation: PropTypes.func.isRequired,
  push: PropTypes.func,
  reduceTextLength: PropTypes.bool,
};
