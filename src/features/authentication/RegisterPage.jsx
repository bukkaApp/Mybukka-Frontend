import React, { useState, Fragment, useEffect } from 'react';

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
  status: { authenticated },
  authModal,
  authenticateUser,
  errorMessage,
  classNames,
  history: { push },
}) => {
  const { NODE_ENV } = process.env;
  const [isRequested, setIsRequested] = useState(false);
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

  const handleLinkOptions = (link) => {
    $('#authModal').modal('hide');
    push(link);
  };

  // fix error message coincedence for both signup and signin
  const errorMsg = isRequested ? errorMessage : '';

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
      setIsRequested(true);
      return authenticateUser('/user/signup', inputData);
    }
  };

  const handleRedirection = () => {
    if (!authModal && authenticated) {
      return push('/');
    }
  };

  useEffect(() => () => {
    if (!authenticated && NODE_ENV !== 'test') {
      $('#authModal').modal('hide');
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      $('#authModal').modal('hide');
    }
    handleRedirection();
  });

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

  return (
    <Fragment>
      <ToolBar />
      <div className="bg-color auth-page">
        <Authentication
          title="Sign Up"
          errorMessage={errorMsg}
          handleChange={handleChange}
          handleLinkOptions={handleLinkOptions}
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
  classNames: '',
  user: { message: '' },
};

RegisterPage.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  authModal: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  classNames: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
