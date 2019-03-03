import React from 'react';

import PropTypes from 'prop-types';
import Chevron from 'Components/icons/ChevronRight';
import AuthForm from './AuthForm';

import './authentication.scss';

const Wrapper = ({ children, classNames }) => (
  <div className={`auth-wrapper ${classNames}`}>
    {children}
  </div>
);

const GoToPrev = ({ handleBackClick, slideToNextInput }) => {
  if (slideToNextInput) {
    return (
      <div
        tabIndex="0"
        role="button"
        aria-pressed="false"
        onClick={handleBackClick}
        className="chevron-left"
      >
        <Chevron />
      </div>
    );
  }
  return null;
};

const Authentication = ({ ...props }) => {
  let authTitle = props.title;
  if (props.slideToNextInput) {
    authTitle = 'Type your password';
  }
  return (
    <Wrapper classNames={props.classNames}>
      <GoToPrev {...props} />
      <h2 className="text-center pt-4 mb-0 auth-title">{authTitle}</h2>
      <AuthForm {...props} />
    </Wrapper>
  );
};
const AuthContainer = ({ ...props }) => {
  const className = 'pt-2 mx-auto col-lg-4 col-md-6 col-sm-8';
  const authClass = props.authModal ? '' : className;
  return (
    <div className={authClass}>
      <Authentication {...props} />
    </div>
  );
};

export default AuthContainer;

Wrapper.defaultProps = {
  children: PropTypes.node.isRequired,
  classNames: ''
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string
};

Authentication.defaultProps = {
  title: PropTypes.string.isRequired,
  classNames: '',
  slideToNextInput: false
};

GoToPrev.defaultProps = {
  slideToNextInput: false,
  handleBackClick: () => {}
};

GoToPrev.propTypes = {
  handleBackClick: PropTypes.func,
  slideToNextInput: PropTypes.bool
};

Authentication.propTypes = {
  title: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  slideToNextInput: PropTypes.bool
};

AuthContainer.defaultProps = {
  authModal: false
};

AuthContainer.propTypes = {
  authModal: PropTypes.bool
};
