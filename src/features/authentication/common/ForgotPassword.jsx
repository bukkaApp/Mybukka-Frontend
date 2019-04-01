import React from 'react';

import PropTypes from 'prop-types';

const ForgotPassword = ({ handleForgotPassword }) => (
  <div
    onClick={handleForgotPassword}
    aria-pressed="false"
    role="button"
    tabIndex="0"
    className="col-lg-12 padding terms text-center"
  >
    <p className="link text-muted">
        Forgot Password?
    </p>
  </div>
);


export default ForgotPassword;

ForgotPassword.propTypes = {
  handleForgotPassword: PropTypes.func.isRequired
};
