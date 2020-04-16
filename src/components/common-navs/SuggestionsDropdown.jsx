import React from 'react';
import PropTypes from 'prop-types';

import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';

const SuggestionsDropdown = ({
  setLocation, push,
  useCurrentLocationVisible,
}) => (
  <div className="suggestion-dropdown">
    {useCurrentLocationVisible &&
      <UseCurrentLocation push={push} />
    }
    <GeoSuggestions
      handleClick={setLocation}
    />
  </div>
);

export default SuggestionsDropdown;

SuggestionsDropdown.defaultProps = {
  push: () => {},
  reduceTextLength: false,
  useCurrentLocationVisible: true,
};

SuggestionsDropdown.propTypes = {
  setLocation: PropTypes.func.isRequired,
  push: PropTypes.func,
  reduceTextLength: PropTypes.bool,
  useCurrentLocationVisible: PropTypes.bool
};
