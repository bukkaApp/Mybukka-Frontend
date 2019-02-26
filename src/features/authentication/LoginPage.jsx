import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';

import autheticate from './actionCreators/authenticate';
import Authentication from './components/Authentication';

import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';

export const LoginPage = ({
  status,
  errorMessage,
  authenticateUser,
  history: { push }
}) => {
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError,
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
      return authenticateUser('/user/signin', inputData);
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
        title="Log In"
        errorMessage={errorMessage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        domStructure={signInDomStructure}
        validationErrors={validationErrors}
        isFormCompleted
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  authenticationReducer: { status, errorMessage }
}) => ({
  status, errorMessage
});

export default connect(
  mapStateToProps,
  { authenticateUser: autheticate }
)(LoginPage);

LoginPage.defaultProps = {
  errorMessage: ''
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  errorMessage: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
};
