import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({ handleClick }) => (
  <div className="suggestion-dropdown">
    <UseCurrentLocation
      handleClick={handleClick}
    />
    <GeoSuggestions
      handleClick={handleClick}
      suggestions={[
        { location: 'Mende Maryland, Lagos', key: '1' },
        { location: 'Mende Maryland, Lagos', key: '2' },
        { location: 'Mende Maryland, Lagos', key: '3' },
      ]}
    />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  handleClick: () => {},
};

SuggestionsDropdown.propTypes = {
  handleClick: PropTypes.func,
};
