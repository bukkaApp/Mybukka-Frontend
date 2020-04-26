import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from 'Components/navbar';
import Container from 'Components/container';
import AuthResetForm from './AuthResetForm';
import TokenErrorFeedback from './TokenErrorFeedback';

import ModalRoot from '../../modal-root/Index';
import changePassword from '../actionCreators/changePassword';
import validateToken from '../actionCreators/validateToken';
import { validateAField, validateAllFields } from '../helper/validateFields';

import signUpDomStructure from '../signUpDomStructure.json';
import useQuery from '../../../context/useQuery';

const RetrieveSection = ({
  isValidUser,
  requestSent,
  checkIsValidUser,
  requested,
  errorMessage,
  changeAuthPassword,
}) => {
  const query = useQuery();
  const { push } = useHistory();
  const [validationErrors, setValidationErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const [inputData, setInputData] = useState({
    password: '',
    confirmPassword: ''
  });

  const validateOnClick = (newValidationErrors) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationErrors
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
      return changeAuthPassword('/user/reset', inputData, query.get('token'));
    }
  };

  const handleToken = (token) => {
    if (!token) {
      return push('/');
    }
  };

  const handleUserValidity = async (token) => {
    if (!isValidUser) {
      handleToken(token);
      await checkIsValidUser('/user/token/validate', token);
    }
  };

  const successRedirection = () => {
    if (requested) {
      return push('/login');
    }
  };

  useEffect(() => {
    handleUserValidity(query.get('token'));
    successRedirection();
  });

  return (
    <>
      <ModalRoot push={push} />
      <Navbar push={push} />
      <div className="bg-color py-8">
        <Container classNames="relative modal-open">
          <div
            className="d-flex flex-column flex-xl-row
              flex-lg-row flex-md-column justify-content-center"
          >
            <div
              className="col-xl-6 col-lg-6 px-0
                px-md-0 px-lg-3 col-md-12 col-12"
            >
              {requestSent &&
              <div className="card-shadow card mb-3 border">
                {isValidUser ? (
                  <AuthResetForm
                    push={push}
                    title="Reset Password"
                    errorMessage={errorMessage}
                    instruction="Type your new password"
                    handleChange={handleChange}
                    validationErrors={validationErrors}
                    handleSubmit={handleSubmit}
                    domStructure={signUpDomStructure}
                    isFormCompleted
                  />
                ) : (
                  <TokenErrorFeedback push={push} />
                )}
              </div>
              }
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = ({
  changePasswordReducer: { requested, errorMessage },
  validateTokenReducer: { isValidUser, requested: requestSent }
}) => ({
  isValidUser,
  requestSent,
  requested,
  errorMessage
});

export default connect(mapStateToProps, {
  changeAuthPassword: changePassword,
  checkIsValidUser: validateToken
})(RetrieveSection);

RetrieveSection.defaultProps = {
  changeAuthPassword: () => {},
  checkIsValidUser: () => {},
  requested: false,
  requestSent: false,
  isValidUser: false,
  errorMessage: ''
};

RetrieveSection.propTypes = {
  changeAuthPassword: PropTypes.func,
  checkIsValidUser: PropTypes.func,
  isValidUser: PropTypes.bool,
  requested: PropTypes.bool,
  requestSent: PropTypes.bool,
  errorMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};
