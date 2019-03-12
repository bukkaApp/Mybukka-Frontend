import React, { useState } from 'react';

import PropTypes from 'prop-types';

import EditTogglerButton from './EditTogglerButton';

import './inputAccountDetails.scss';
import './errordisplaysection.scss';

const ErrorDisplaySection = ({
  errorMessage,
}) => {
  const [accepted, setAccepted] = useState(false);
  const handleErrorAcceptance = (event) => {
    event.preventDefault();
    setAccepted(true);
  };

  let errorComponent = null;
  if (errorMessage && !accepted) {
    errorComponent = (
      <div className="error-section input-acc-details-section">
        <div className="form-acc-details">
          <div className="form-group input-acc-details">
            {errorMessage && (
              <p className="error-details text-danger">{errorMessage}
              </p>
            )}
          </div>
          <EditTogglerButton
            handleClick={handleErrorAcceptance}
            text="OK"
          />
        </div>
      </div>
    );
  }
  return errorComponent;
};
export default ErrorDisplaySection;

ErrorDisplaySection.defaultProps = {
  errorMessage: '',
};

ErrorDisplaySection.propTypes = {
  errorMessage: PropTypes.string,
};
