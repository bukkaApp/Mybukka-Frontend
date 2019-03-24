import React from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/button/Button';

const SubmitButton = ({ ...props }) => (
  <div className="col-11 mx-auto">
    <Button {...props} />
  </div>
);

const AuthButton = props => (
  <SubmitButton
    type="submit"
    id="submit"
    classNames={`col-md-12 primary-button mt-5
    ${!props.isFormCompleted ? 'disabled' : 'button'}
    `}
    text="Send Confirmation"
    key="0"
    handleClick={() => {}}
  />
);

export default AuthButton;

AuthButton.defaultProps = {
  isFormCompleted: false,
  title: '',
};

AuthButton.propTypes = {
  isFormCompleted: PropTypes.bool,
};

SubmitButton.defaultProps = {
  title: ''
};

SubmitButton.propTypes = {
  title: PropTypes.string
};
