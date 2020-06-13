import React, { Fragment, useState, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar';
import fetchCartAction from 'Redux/fetchCartAction';
import Authentication from './components/Authentication';
import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import useApi from '../../shared/api';
import signInDomStructure from './signInDomStructure.json';
import './auth.scss';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';

export const LoginPage = memo(({
  authModal: hasModal,
  classNames,
  history: { push, location },
}) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setUser, setSignInData, isAuthenticated, setVerified } = useUserContext();
  const { setAuthenticationPopup, setVerificationPhonePopup, setModal } = useModalContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [nextSlide, setNextSlide] = useState(false);

  const handleClick = () => {
    setModal(false);
    setAuthenticationPopup(false);
  };

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  // forgot password
  const handleLinkOptions = (link) => {
    handleClick();
    push(link);
  };

  const goToPrev = () => {
    setNextSlide(false);
  };

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError,
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
        setVerified(response.data.user.verified);
        handleExpensiveEvents(response.data.user.verified);
      }
    } catch (error) {
      loading(false);
      setErrorMessage(error.response ? error.response.data.message : error.message);
    }
  };

  const onSubmit = (errors, passes) => {
    if (!errors.email && errors.password && !nextSlide) {
      setNextSlide(true);
      setValidationErrors({ ...validationErrors, password: '' });
    }
    if (!passes) return;
    setNextSlide(true);
    setSignInData(`${inputData.password}.bukka@gmail.com`);
    if (nextSlide) return tryCatch(API.authToken.post, inputData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    onSubmit(errors, passes);
  };

  const handleFBAuth = async (e) => {
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
          title="Log In"
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          errorMessage={errorMessage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          domStructure={signInDomStructure}
          validationErrors={validationErrors}
          isFormCompleted
          hasModal={hasModal}
          classNames={classNames}
          userEmail={inputData.email}
          slideToNextInput={nextSlide}
          handleBackClick={goToPrev}
          handleFBAuth={handleFBAuth}
        />
      </div>
      {!hasModal && <div className="pb-3"> <Logo /></div>}
    </Fragment>
  );
});

const mapStateToProps = () => ({});

export default memo(connect(
  mapStateToProps,
  { fetchCartItems: fetchCartAction }
)(LoginPage));

LoginPage.defaultProps = {
  errorMessage: '',
  authModal: false,
  classNames: '',
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  authModal: PropTypes.bool,
  classNames: PropTypes.string,
};
