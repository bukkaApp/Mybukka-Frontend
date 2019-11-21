/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';

const androidDevice = window.innerWidth < 767 && window.innerWidth > 400;
const windowsDevice = window.innerWidth <= 400 && window.innerWidth > 293;
const iosDeveice = window.innerWidth <= 293;

const GeoSuggestions = ({ suggestions, handleClick, reduceTextLength }) => (
  <Fragment>
    {suggestions.map(suggestion => (
      <div
        className="suggestion-geo-group input-group"
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
        <h4 className="suggestion suggestion-geo text-center d-block">
          {/* responsive shorten of location text */}
          {reduceTextLength || suggestion.description.length > 33 ?
            androidDevice ? suggestion.description.slice(0, 40)
              : windowsDevice ? suggestion.description.slice(0, 30)
                : iosDeveice ? suggestion.description.slice(0, 20)
                  : `${suggestion.description.slice(0, 48)}...`
            : suggestion.description
          }
        </h4>
      </div>
    ))}
  </Fragment>
);

const mapStateToProps = ({ locationsPredictionReducer: { predictions } }) => ({
  suggestions: predictions
});

export default connect(
  mapStateToProps,
  null
)(GeoSuggestions);

GeoSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClick: PropTypes.func.isRequired,
  reduceTextLength: PropTypes.bool.isRequired,
};
