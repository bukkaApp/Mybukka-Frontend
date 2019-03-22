import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import NavLink from 'Components/navlink/Navlink';
import TextField from '../common/TextField';
import './authinputgroup.scss';

const ForgotPassword = ({ slideToNextInput }) => {
  if (slideToNextInput) {
    return (
      <div className="col-lg-12 padding terms text-center">
        <p><NavLink classNames="link" href="/reset-password" text="Forgot Password?" /></p>
      </div>
    );
  }
  return null;
};

const AuthFormTitle = ({ slideToNextInput, userEmail }) => {
  if (slideToNextInput) {
    return (
      <div className="form-title mb-4">
        <span>Welcome back,<br /></span>
        <span className="auth-form-title">{userEmail}</span>
      </div>
    );
  }
  return (
    <div className="form-title mb-4">
      <span>Type your email</span>
    </div>
  );
};

const AuthInputGroup = (props) => {
  const slideToNextInput =
    props.slideToNextInput ? 'slide-next-input' : '';

  if (props.title === 'Sign Up') {
    return (
      <div className="mt-1">
        <TextField {...props} />
      </div>
    );
  }
  return (
    <Fragment>
      <AuthFormTitle {...props} />
      <div className="input-group-wrapper mt-9">
        <div className={`input-slide text-center ${slideToNextInput}`}>
          <TextField {...props} />
        </div>
        <ForgotPassword {...props} />
      </div>
    </Fragment>
  );
};

export default AuthInputGroup;

AuthInputGroup.defaultProps = {
  title: 'Sign Up',
  slideToNextInput: false
};

ForgotPassword.defaultProps = {
  slideToNextInput: false
};

ForgotPassword.propTypes = {
  slideToNextInput: PropTypes.bool
};

AuthFormTitle.defaultProps = {
  slideToNextInput: false,
  userEmail: ''
};

AuthFormTitle.propTypes = {
  userEmail: PropTypes.string,
  slideToNextInput: PropTypes.bool
};

AuthInputGroup.propTypes = {
  title: PropTypes.string,
  slideToNextInput: PropTypes.bool
};

