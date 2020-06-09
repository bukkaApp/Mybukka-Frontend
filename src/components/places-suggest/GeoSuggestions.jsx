/* eslint-disable camelcase */
import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import MapMarker from '../icons/MapMarker';
import './GeoSuggestions.scss';
import Button from '../button/Button';
import { useLocationContext } from '../../context/LocationContext';

const GeoSuggestions = ({ handleClick, predictions, asUtility, text, emitOnClick, withPrimaryButton, noBorderOnMedium }) => {
  const { setUpdate } = useLocationContext();

  const onClick = (suggestion) => {
    handleClick(suggestion, true);
    setUpdate(true);
  };

  return (
    <Fragment>
      {predictions.map((suggestion) => {
        const { terms } = suggestion;
        const filteredTerms = terms.reduce((arr, item) => [...arr, item.value], []);
        return (
          <div
            className={`${asUtility ? 'Suggestion-Address' : 'suggestion-group-style'} ${(noBorderOnMedium && 'Suggestion-Address-Border--less') || ''}`}
            onClick={() => onClick(suggestion)}
            tabIndex="0"
            role="link"
            key={suggestion.id || filteredTerms.join('-')}
          >
            {!asUtility &&
            <div className="input-group-prepend">
              <span className="input-group-text location-arrow">
                <MapMarker />
              </span>
            </div>
            }
            <div className="suggestion suggestion-geo text-center d-flex">
              {filteredTerms.slice(0, 2).map((term, indx) => (
                <span key={`term-${term}`} className={`${indx !== 0 ? 'secondary-address-suggest' : ''}`}>{term}</span>))}
              {filteredTerms.length > 2 && <span className="secondary-address-suggest">
                {filteredTerms.slice(2).join(', ')}
              </span>}
            </div>
            {asUtility &&
            <div className="edit-toggler-button">
              <Button
                type="button"
                handleClick={emitOnClick}
                text={text}
                classNames={`Button-Stripe ${(withPrimaryButton && 'Primary-Color') || ''}`}
              />
            </div>
            }
          </div>
        );
      })}
    </Fragment>
  );
};

export default GeoSuggestions;

GeoSuggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
