import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import { validateAField, validateAllFields } from './helper/validateFields';
import AuthResetForm from './components/AuthResetForm';


import signInDomStructure from './signInDomStructure.json';
import useApi from '../../shared/api';

import FeedbackSection from './components/FeedbackSection';

import './ResetPassword.scss';

const ResetPassword = ({ history: { push } }) => {
  const { API } = useApi();
  const [state, setState] = useState({ requested: false, isError: false });
  const [errorMessage, setErrorMessage] = useState('');
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
      return API.passwordReset.post({ data: inputData })
        .catch((err) => {
          setState({ ...state, requested: true, isError: true });
          setErrorMessage(err.response ? err.response.data.message : err.message);
        })
        .then(() => setState({ ...state, requested: true, isError: false }));
    }
  };

  return (
    <>
      <Navbar push={push} />
      <div className="bg-color py-8">
        <Container classNames="relative modal-open">
          <div
            className="d-flex flex-column flex-xl-row
          flex-lg-row flex-md-column justify-content-center"
          >
            <div
              className="col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3 col-md-12 col-12"
            >
              <div className="Imaginery-Card-Section mb-3">
                {!state.requested || state.isError ?
                  <AuthResetForm
                    push={push}
                    title="Reset"
                    errorMessage={errorMessage}
                    inputData={inputData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    domStructure={signInDomStructure}
                    validationErrors={validationErrors}
                    isFormCompleted
                  />
                  : <FeedbackSection push={push} />}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;

ResetPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
};
