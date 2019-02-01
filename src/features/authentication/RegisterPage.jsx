import React, { useState, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';
import Authentication from './components/Authentication';

import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';

const RegisterPage = ({ history: { push } }) => {
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

  const validateOnClick = () => {
    const validation = validateAllFields(inputData);
    setValidationErrors({
      ...validationErrors,
      ...validation
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

    validateOnClick();
    this.props.history.push('/');
  };

  return (
    <Fragment>
      <PrimaryNavbar push={push} />
      <Authentication
        title="Sign Up"
        handleChange={handleChange}
        validationErrors={validationErrors}
        handleSubmit={handleSubmit}
        domStructure={signUpDomStructure}
        isFormCompleted
      />
    </Fragment>
  );
};

export default RegisterPage;

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
