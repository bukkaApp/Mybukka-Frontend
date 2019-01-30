import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';

const GeoSuggestions = ({ suggestions, handleClick }) => (
  <Fragment>
    {suggestions.map(suggestion => (
      <div
        className="suggestion-geo-group input-group"
        onClick={handleClick}
        tabIndex={0}
        role="link"
        key={suggestion.key}
      >
        <div className="input-group-prepend">
          <span className="input-group-text location-arrow">
            <MapMarker />
          </span>
        </div>
        <h4 className="suggestion suggestion-geo text-center d-block">
          {suggestion.location}
        </h4>
      </div>
    ))}
  </Fragment>
);

export default GeoSuggestions;

GeoSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
  handleClick: PropTypes.func.isRequired
};
