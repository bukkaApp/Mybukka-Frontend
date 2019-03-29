import React from 'react';

import PropTypes from 'prop-types';

import AuthButtonGroup from './AuthButtonGroup';
import AuthFooter from './AuthFooter';
import AuthInputGroup from './AuthInputGroup';
import TermsAndConditions from './TermsAndConditions';

import './authform.scss';

const ErrorMessage = ({ message }) => {
  if (message) {
    return (
      <div className="text-danger help-block text-center my-4">{message}</div>
    );
  }
  return null;
};

const preventDefault = event => event.preventDefault();

const AuthForm = ({
  handleForgotPassword,
  handleChange,
  handleSubmit,
  domStructure,
  validationErrors,
  isFormCompleted,
  errorMessage,
  title,
  slideToNextInput,
  userEmail
}) => (
  <form
    className="pb-3 form-auth"
    name="form"
    onSubmit={!isFormCompleted ? preventDefault : handleSubmit}
  >
    <AuthInputGroup
      slideToNextInput={slideToNextInput}
      title={title}
      userEmail={userEmail}
      handleChange={handleChange}
      domStructure={domStructure}
      handleForgotPassword={handleForgotPassword}
      validationErrors={validationErrors}
    />
    <ErrorMessage message={errorMessage} />
    <TermsAndConditions title={title} />
    <AuthButtonGroup
      isFormCompleted={isFormCompleted}
      title={title}
    />
    <AuthFooter title={title} />
  </form>
);

export default AuthForm;

AuthForm.defaultProps = {
  domStructure: {},
  isFormCompleted: false,
  title: '',
  validationErrors: {},
  errorMessage: '',
  slideToNextInput: false,
  userEmail: '',
  handleForgotPassword: () => {}
};

AuthForm.propTypes = {
  handleForgotPassword: PropTypes.func,
  slideToNextInput: PropTypes.bool,
  userEmail: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  domStructure: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  validationErrors: PropTypes.objectOf(PropTypes.string),
  isFormCompleted: PropTypes.bool,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
