import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';
import Authentication from './components/Authentication';

import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';

const LoginPage = ({ history: { push } }) => {
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const validateOnClick = () => {
    const validation = validateAllFields(inputData);
    setValidationErrors({
      ...validationErrors,
      ...validation,
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
  };

  return (
    <Fragment>
      <PrimaryNavbar push={push} />
      <Authentication
        type="Login"
        title="Log In"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        domStructure={signInDomStructure}
        validationErrors={validationErrors}
        isFormCompleted
      />
    </Fragment>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
