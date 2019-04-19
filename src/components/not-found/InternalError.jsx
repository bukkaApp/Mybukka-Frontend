import React from 'react';
import Navbar from 'Components/navbar';
import PropTypes from 'prop-types';


import './notavailable.scss';

const InternalError = ({ history: { push } }) => (
  <div className="custom-error-bgColor bukka-brand-white">
    <Navbar push={push} />
    <div className="error-main-section">
      <div className="error-main-content">
        <div className="custom-error-img-container">
          <h2 className="custom-error-img-text">500</h2>
          <div>
            <div className="error-img" />
            <div className="second-error-img" />
          </div>
        </div>
        <h2 className="custom-error-text">
          <span>Oops. We did something bad.</span>
        </h2>
        <p className="custom-error-secondary-text">
          <span>
            We’ve been alerted and are working on a fix.
            Please check back in a few minutes and everything
            should be back to normal.
          </span>
        </p>
        <a href="/">
          <button className="error-redirect-btn">
            <span>Go To Homepage</span>
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default InternalError;

InternalError.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
