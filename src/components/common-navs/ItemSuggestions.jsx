import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';

const ItemSuggestions = ({ suggestions, handleClick }) => (
  <div className="suggestion-dropdown">
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
          {suggestion.description.length > 48
            ? `${suggestion.description.slice(0, 48)}...`
            : suggestion.description}
        </h4>
      </div>
    ))}
  </div>
);

const mapStateToProps = ({ locationsPredictionReducer: { predictions } }) => ({
  suggestions: predictions
});

export default connect(
  mapStateToProps,
  null
)(ItemSuggestions);

ItemSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClick: PropTypes.func.isRequired
};
