import React from 'react';

import PropTypes from 'prop-types';

const ForgotPassword = ({ handleLinkOptions }) => (
  <div
    onClick={() => handleLinkOptions('/reset-password')}
    aria-pressed="false"
    role="button"
    tabIndex="0"
    className="col-lg-12 padding terms text-center"
  >
    <p className="link text-muted link-hover">
        Forgot Password?
    </p>
  </div>
);


export default ForgotPassword;

ForgotPassword.defaultProps = {
  handleLinkOptions: () => {}
};

ForgotPassword.propTypes = {
  handleLinkOptions: PropTypes.func
};
