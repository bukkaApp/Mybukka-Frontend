import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import PrimaryNavbar from 'Components/navbar';
import urlFilter from '../../shared/urlFilter';
import authenticate from './actionCreators/authenticate';
import Authentication from './components/Authentication';

import Logo from './common/Logo';
import { validateAField, validateAllFields } from './helper/validateFields';

import signInDomStructure from './signInDomStructure.json';
import './auth.scss';

export const LoginPage = ({
  status: { authenticated: isAuthenticated },
  authModal: hasModal,
  errorMessage,
  classNames,
  authenticateUser,
  history: { push, location }
}) => {
  const isBigScreen = useMediaQuery({ minWidth: 960 });
  const [isRequested, setIsRequested] = useState(false);
  const [nextSlide, setNextSlide] = useState(false);
  // const [redirect, setRedirection] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: ''
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const handleLinkOptions = (link) => {
    $('#authModal').modal('hide');
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

  const withAuth = (isAuth, callback) => {
    if (isAuth) {
      callback();
    }
  };

  const handleExpensiveEvents = () => {
    const hasRedirection = location && location.search;
    if (isBigScreen && hasModal) {
      $('#authModal').modal('hide');
    } else if (isBigScreen && hasRedirection) {
      const redirect = urlFilter(location.search);
      return push(redirect);
    } else {
      push('/');
    }
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
          .then(d => withAuth(d.status === 200, handleExpensiveEvents));
      }
    }
  };

  useEffect(() => {
    withAuth(isAuthenticated, handleExpensiveEvents);
  }, []);

  const BukkaLogo = () => {
    if (!hasModal) {
      return (
        <div className="pb-3">
          <Logo />
        </div>
      );
    }
    return null;
  };

  const ToolBar = () => {
    if (!hasModal) {
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
          title="Log In"
          inputData={inputData}
          handleLinkOptions={handleLinkOptions}
          errorMessage={errorMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          domStructure={signInDomStructure}
          validationErrors={validationErrors}
          isFormCompleted
          authModal={hasModal}
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
