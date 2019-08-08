import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({ setLocation, push }) => (
  <div className="suggestion-dropdown">
    <UseCurrentLocation push={push} />
    <GeoSuggestions handleClick={setLocation} />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  push: () => {}
};

SuggestionsDropdown.propTypes = {
  setLocation: PropTypes.func.isRequired,
  push: PropTypes.func,
};
