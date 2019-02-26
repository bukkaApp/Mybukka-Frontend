import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';

import autheticate from './actionCreators/authenticate';
import Authentication from './components/Authentication';

import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';

const LoginPage = ({
  status,
  errorMessage,
  authenticationUser,
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
      return authenticationUser('/user/signin', inputData);
    }
  };

  useEffect(() => {
    const { autheticated } = status;
    if (autheticated) {
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
  { authenticationUser: autheticate }
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
  authenticationUser: PropTypes.func.isRequired,
};
