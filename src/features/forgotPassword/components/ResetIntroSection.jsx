import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { validateAField, validateAllFields } from '../helper/validateFields';
import AuthResetForm from './AuthResetForm';


import signInDomStructure from '../signInDomStructure.json';

const ResetIntroSection = ({ push, errorMessage, sendARequestToChangePassword }) => {
  const [validationErrors, setValidationErrors] = useState({
    email: ''
  });

  const [inputData, setInputData] = useState({
    email: ''
  });

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name, true);
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
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      return sendARequestToChangePassword('/user/reset', inputData);
    }
  };

  return (
    <AuthResetForm
      push={push}
      title="Reset"
      errorMessage={errorMessage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      domStructure={signInDomStructure}
      validationErrors={validationErrors}
      isFormCompleted
    />
  );
};

export default ResetIntroSection;

ResetIntroSection.defaultProps = {
  errorMessage: '',
  push: () => {},
};

ResetIntroSection.propTypes = {
  errorMessage: PropTypes.string,
  push: PropTypes.func,
  sendARequestToChangePassword: PropTypes.func.isRequired,
};
