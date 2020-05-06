/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';
import { useLocationsPredictionContext } from '../../context/useLocationsPrediction';

const GeoSuggestions = ({ handleClick }) => {
  const { predictions } = useLocationsPredictionContext();

  return (
    <Fragment>
      {predictions.map(suggestion => (
        <div
          className="suggestion-geo-group suggestion-group-style"
          onClick={() => handleClick(suggestion)}
          tabIndex={0}
          role="link"
          key={suggestion.id}
        >
          <div className="input-group-prepend">
            <span className="input-group-text location-arrow">
              <MapMarker />
            </span>
          </div>
          <h4 className="suggestion suggestion-geo text-center d-flex">
            {suggestion.description}
          </h4>
        </div>
      ))}
    </Fragment>
  );
};

export default GeoSuggestions;

GeoSuggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
