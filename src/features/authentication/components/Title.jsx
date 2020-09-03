import React from 'react';

import PropTypes from 'prop-types';

const Title = ({ slideToNextInput, userEmail }) => {
  if (slideToNextInput) {
    return (
      <div className="form-title mb-4">
        <span>Welcome back,<br /></span>
        <span className="auth-form-title">{userEmail}</span>
      </div>
    );
  }
  return (
    <div className="form-title mb-4">
      <span>Type your email</span>
    </div>
  );
};

export default Title;

Title.defaultProps = {
  slideToNextInput: false,
  userEmail: ''
};

Title.propTypes = {
  userEmail: PropTypes.string,
  slideToNextInput: PropTypes.bool
};
