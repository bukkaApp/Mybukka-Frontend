import React, { useState, Fragment, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import PrimaryNavbar from 'Components/navbar';
import Authentication from './components/Authentication';
import fetchUserDataAction from '../profile/actionCreators/fetchUserData';

import Logo from './common/Logo';
import authenticate from './actionCreators/authenticate';
import { validateAField, validateAllFields } from './helper/validateFields';

import { useModalContext } from '../../context/UseModal';
import signUpDomStructure from './signUpDomStructure.json';
import './auth.scss';
import urlFilter from '../../shared/urlFilter';

export const RegisterPage = ({
  status: { authenticated: isAuthenticated },
  authModal: hasModal,
  authenticateUser,
  errorMessage,
  classNames,
  history: { push },
  fetchUserData,
}) => {
  const { setVerificationPhonePopup, setAuthenticationPopup, setModal } = useModalContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });
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

  const handleClick = () => {
    setModal(false);
    setAuthenticationPopup(false);
  };

  const handleLinkOptions = (link) => {
    handleClick();
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

  const withSuccess = (isAuth, callback) => {
    if (isAuth) {
      callback();
    }
  };

  const verifyPhone = () => {
    fetchUserData()
      .then((d) => {
        withSuccess(d.status === 200, () => {
          const hasntVerified = d.data.userInfo.verified === false;
          if (hasntVerified) {
            setVerificationPhonePopup(true);
            setModal(true);
          }
        });
      });
  };

  const handleExpensiveEvents = () => {
    const hasRedirection = location && location.search;
    if (isBigScreen && hasModal) {
      handleClick();
    } else if (isBigScreen && hasRedirection) {
      const redirect = urlFilter(location.search);
      verifyPhone();
      return push(redirect);
    } else {
      push('/');
    }
    verifyPhone();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);

    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      setIsRequested(true);
      return authenticateUser('/user/signup', inputData)
        .then(d => withSuccess(d.status === 201, handleExpensiveEvents));
    }
  };

  const handleFBAuth = (e) => {
    const fullName = e.name.split(' ');
    const data = {
      lastName: fullName[0],
      firstName: fullName[1],
      email: e.email,
      imageUrl: e.picture.data.url,
    };
    authenticateUser('/user/social/auth', data)
      .then(d => withSuccess(d.status === 200, handleExpensiveEvents));
  };

  useEffect(() => {
    withSuccess(isAuthenticated, handleExpensiveEvents);
  }, []);

  return (
    <Fragment>
      {!hasModal && <PrimaryNavbar push={push} />}
      <div className="bg-color auth-page">
        <Authentication
          title="Sign Up"
          errorMessage={errorMsg}
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
      {!hasModal && <div className="pb-3"> <Logo /></div>}
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
  { authenticateUser: authenticate,
    fetchUserData: fetchUserDataAction }
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
