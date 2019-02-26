import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';
import Authentication from './components/Authentication';

import authenticate from './actionCreators/authenticate';
import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';

export const RegisterPage = ({
  authenticateUser,
  status,
  errorMessage,
  history: { push },
}) => {
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateOnClick = (newValidationErrors) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      return authenticateUser('/user/signup', inputData);
    }
  };

  useEffect(() => {
    const { authenticated } = status;
    if (authenticated) {
      push('/');
    }
  });

  return (
    <Fragment>
      <PrimaryNavbar push={push} />
      <Authentication
        title="Sign Up"
        errorMessage={errorMessage}
        handleChange={handleChange}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
        domStructure={signUpDomStructure}
        isFormCompleted
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  authenticationReducer: { status, user, errorMessage }
}) => ({
  status,
  user,
  errorMessage
});

export default connect(
  mapStateToProps,
  { authenticateUser: authenticate }
)(RegisterPage);

RegisterPage.defaultProps = {
  errorMessage: '',
};

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  errorMessage: PropTypes.string
};
