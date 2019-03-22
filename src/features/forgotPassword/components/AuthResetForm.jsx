import React from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';

import TextField from '../common/TextField';
import AuthButton from '../common/AuthButton';
import CreateAccount from '../common/CreateAccount';

import './authresetform.scss';

const ErrorMessage = ({ message }) => {
  if (message) {
    return (
      <div className="text-danger help-block text-center my-4">{message}</div>
    );
  }
  return null;
};

const preventDefault = event => event.preventDefault();

const AuthResetForm = ({
  push,
  instruction,
  handleChange,
  handleSubmit,
  domStructure,
  validationErrors,
  isFormCompleted,
  errorMessage,
  title,
}) => (
  <>
    <Container>
      <h2 className="text-center pt-4 mb-0 auth-title">Reset password</h2>
      <form
        className="pb-3 form-auth"
        name="form"
        onSubmit={!isFormCompleted ? preventDefault : handleSubmit}
      >
        <div className="form-title mb-4">
          <span>{instruction || 'Type your email'}</span>
        </div>
        <div className="col-12 mt-9">
          <TextField
            handleChange={handleChange}
            domStructure={domStructure}
            validationErrors={validationErrors}
          />
        </div>
        <ErrorMessage message={errorMessage} />
        <AuthButton
          isFormCompleted={isFormCompleted}
          title={title}
        />
      </form>
    </Container>
    <div className="pb-4">
      <CreateAccount push={push} />
    </div>
  </>
);

export default AuthResetForm;

AuthResetForm.defaultProps = {
  push: () => {},
  domStructure: {},
  isFormCompleted: false,
  title: '',
  validationErrors: {},
  errorMessage: '',
  instruction: '',
};

AuthResetForm.propTypes = {
  push: PropTypes.func,
  instruction: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  domStructure: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  validationErrors: PropTypes.objectOf(PropTypes.string),
  isFormCompleted: PropTypes.bool,
  title: PropTypes.string,
  errorMessage: PropTypes.string
};

ErrorMessage.defaultProps = {
  message: '',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
