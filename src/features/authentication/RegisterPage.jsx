import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar';
import Authentication from './components/Authentication';

import Logo from './common/Logo';
import authenticate from './actionCreators/authenticate';
import { validateAField, validateAllFields } from './helper/validateFields';

import signUpDomStructure from './signUpDomStructure.json';
import './auth.scss';

export const RegisterPage = ({
  authModal,
  authenticateUser,
  status,
  errorMessage,
  classNames,
  history: { push },
}) => {
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
      return authenticateUser('/user/signup', inputData);
    }
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
          title="Sign Up"
          errorMessage={errorMessage}
          handleChange={handleChange}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          domStructure={signUpDomStructure}
          isFormCompleted
          authModal={authModal}
          classNames={classNames}
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
)(RegisterPage);

RegisterPage.defaultProps = {
  errorMessage: '',
  authModal: false,
  classNames: ''
};

RegisterPage.propTypes = {
  authModal: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  classNames: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  errorMessage: PropTypes.string
};
