import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar';

import authenticate from './actionCreators/authenticate';
import Authentication from './components/Authentication';

import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';
import './auth.scss';

export const LoginPage = ({
  status,
  authModal,
  errorMessage,
  classNames,
  authenticateUser,
  history: { push }
}) => {
  const [isRequested, setIsRequested] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  // fix error message coincedence for both signup and signin
  const errorMsg = isRequested ? errorMessage : '';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    // if No AutoSuggestion
    if (!errors.email && errors.password && !nextSlide) {
      setNextSlide(true);
      setValidationErrors({
        ...validationErrors,
        password: ''
      });
    }
    if (passes) {
      setNextSlide(true);
      if (nextSlide) {
        setIsRequested(true);
        return authenticateUser('/user/signin', inputData);
      }
    }
  };

  const goToPrev = () => {
    setNextSlide(false);
  };

  const BukkaLogo = () => {
    if (!authModal) {
      return (
        <div className="pb-3">
          <Logo />
        </div>
      );
    }
    return null;
  };

  const ToolBar = () => {
    if (!authModal) {
      return (
        <PrimaryNavbar push={push} />
      );
    }
    return null;
  };

  useEffect(() => {
    const { authenticated } = status;
    if (authenticated) {
      push('/');
    }
  });

  return (
    <Fragment>
      <ToolBar />
      <div className="bg-color auth-page">
        <Authentication
          title="Log In"
          errorMessage={errorMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          domStructure={signInDomStructure}
          validationErrors={validationErrors}
          isFormCompleted
          authModal={authModal}
          classNames={classNames}
          userEmail={inputData.email}
          slideToNextInput={nextSlide}
          handleBackClick={goToPrev}
        />
        <BukkaLogo />
      </div>
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
)(LoginPage);

LoginPage.defaultProps = {
  errorMessage: '',
  authModal: false,
  classNames: ''
};

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  authModal: PropTypes.bool,
  classNames: PropTypes.string,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  errorMessage: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
};
