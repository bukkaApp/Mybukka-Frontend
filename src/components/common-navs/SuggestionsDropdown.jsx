import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({ handleClick, setLocation }) => (
  <div className="suggestion-dropdown">
    <UseCurrentLocation handleClick={handleClick} />
    <GeoSuggestions handleClick={setLocation} />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  handleClick: () => {}
};

SuggestionsDropdown.propTypes = {
  handleClick: PropTypes.func,
  setLocation: PropTypes.func.isRequired,
};
