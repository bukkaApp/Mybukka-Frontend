import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({ setLocation }) => (
  <div className="suggestion-dropdown">
    <UseCurrentLocation />
    <GeoSuggestions handleClick={setLocation} />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  handleClick: () => {}
};

SuggestionsDropdown.propTypes = {
  setLocation: PropTypes.func.isRequired,
};
