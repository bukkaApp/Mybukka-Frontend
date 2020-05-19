/* eslint-disable camelcase */
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';
import './GeoSuggestions.scss';

const GeoSuggestions = ({ handleClick, predictions }) => (
  <Fragment>
    {predictions.map((suggestion) => {
      const { terms } = suggestion;
      const filteredTerms = terms.reduce((arr, item) => [...arr, item.value], []);
      return (
        <div
          className="suggestion-group-style"
          onClick={() => handleClick(suggestion, true)}
          tabIndex="0"
          role="link"
          key={suggestion.id}
        >
          <div className="input-group-prepend">
            <span className="input-group-text location-arrow">
              <MapMarker />
            </span>
          </div>
          <div className="suggestion suggestion-geo text-center d-flex">
            {filteredTerms.slice(0, 2).map((term, indx) => (
              <span key={`term-${term}`} className={`${indx !== 0 ? 'secondary-address-suggest' : ''}`}>{term}</span>))}
            {filteredTerms.length > 2 && <span className="secondary-address-suggest">
              {filteredTerms.slice(2).join(', ')}
            </span>}
          </div>
        </div>
      );
    })}
  </Fragment>
);

export default GeoSuggestions;

GeoSuggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
