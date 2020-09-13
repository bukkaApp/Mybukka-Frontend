import React, { useState, Fragment, useEffect } from 'react';

import PropTypes from 'prop-types';
import PrimaryNavbar from 'Components/navbar';
import Authentication from './components/Authentication';

import useApi from '../../shared/api';
import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import './auth.scss';

export const RegisterPage = ({
  authModal: hasModal,
  classNames,
  history: { push, location },
}) => {
  const { API } = useApi();
  const { setUser, setVerified, isAuthenticated } = useUserContext();
  const { loading } = useLoadingContext();
  const {
    setVerificationPhonePopup,
    setAuthenticationPopup,
    setModal,
  } = useModalContext();
  const [errorMessage, setErrorMessage] = useState(false);
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

  const handleClick = () => {
    setModal(false);
    setAuthenticationPopup(false);
  };

  const handleLinkOptions = (link) => {
    handleClick();
    push(link);
  };

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
      ...newFieldData,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message,
    });
  };

  const requestVerification = (hasVerified) => {
    if (hasVerified === false) {
      setVerificationPhonePopup(true);
      setModal(true);
    }
  };

  const handleExpensiveEvents = (hasVerified) => {
    if (hasModal) {
      handleClick();
      requestVerification(hasVerified);
    } else {
      const redirect = location.state ? location.state.redirectTo : '/';
      push(redirect);
      return requestVerification(hasVerified);
    }
  };

  const tryCatch = async (apiCall, data) => {
    try {
      loading(true);
      const response = await apiCall(data);
      loading(false);
      if (response.data.token) {
        setUser(response.data.user, response.data.token);
        localStorage.setItem('x-access-token', response.data.token);
        setVerified(response.data.user.verified);
        handleExpensiveEvents(response.data.user.verified);
      }
    } catch (error) {
      loading(false);
      setErrorMessage(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) return tryCatch(API.register.post, inputData);
  };

  const handleFBAuth = (e) => {
    if (!e) return;
    const fullName = e.name.split(' ');
    const data = {
      lastName: fullName[0],
      firstName: fullName[1],
      email: e.email,
      imageUrl: e.picture.data.url,
    };
    return tryCatch(API.socialAuth.post, data);
  };

  useEffect(() => {
    if (isAuthenticated) handleExpensiveEvents();
  }, []);

  return (
    <Fragment>
      {!hasModal && <PrimaryNavbar push={push} />}
      <div className="bg-color auth-page">
        <Authentication
          title="Sign Up"
          errorMessage={errorMessage}
          handleChange={handleChange}
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          domStructure={signUpDomStructure}
          isFormCompleted
          hasModal={hasModal}
          classNames={classNames}
          handleFBAuth={handleFBAuth}
        />
      </div>
      {!hasModal && (
        <div className="pb-3">
          {' '}
          <Logo />
        </div>
      )}
    </Fragment>
  );
};

export default RegisterPage;

RegisterPage.defaultProps = {
  authModal: false,
  classNames: '',
};

RegisterPage.propTypes = {
  authModal: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  classNames: PropTypes.string,
};
