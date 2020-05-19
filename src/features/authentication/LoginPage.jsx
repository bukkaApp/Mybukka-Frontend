import React, { Fragment, useState, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import PrimaryNavbar from 'Components/navbar';
import urlFilter from '../../shared/urlFilter';
import authenticate from './actionCreators/authenticate';
import Authentication from './components/Authentication';
import fetchUserDataAction from '../profile/actionCreators/fetchUserData';
import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';
import './auth.scss';
import { useModalContext } from '../../context/UseModal';

export const LoginPage = memo(({
  status: { authenticated: isAuthenticated },
  authModal: hasModal,
  errorMessage,
  classNames,
  authenticateUser,
  history: { push, location },
  fetchUserData,
}) => {
  const { setAuthenticationPopup, setVerificationPhonePopup, setModal } = useModalContext();
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const [isRequested, setIsRequested] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);
  // const [redirect, setRedirection] = useState('');

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
    const validation = validateAllFields(inputData, true);

    const { errors, passes } = validation;
    validateOnClick(errors);
    // if No AutoSuggestion
    if (!errors.email && errors.password && !nextSlide) {
      setNextSlide(true);
      setValidationErrors({ ...validationErrors, password: '' });
    }
    if (passes) {
      setNextSlide(true);
      if (nextSlide) {
        setIsRequested(true);
        return authenticateUser('/user/signin', inputData)
          .then(d => withSuccess(d.status === 200, handleExpensiveEvents));
      }
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
          title="Log In"
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          errorMessage={errorMsg}
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

const mapStateToProps = ({
  authenticationReducer: { status, user, errorMessage },
  // userProfileReducer: { userInfo },
}) => ({
  status,
  user,
  errorMessage,
});

export default memo(connect(
  mapStateToProps,
  { authenticateUser: authenticate,
    fetchUserData: fetchUserDataAction
  }
)(LoginPage));

LoginPage.defaultProps = {
  errorMessage: '',
  authModal: false,
  classNames: '',
};

LoginPage.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  authModal: PropTypes.bool,
  classNames: PropTypes.string,
  errorMessage: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired
};
