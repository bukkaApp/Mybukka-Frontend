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

const GoToPrev = ({ handleBackClick, slideToNextInput, classNames }) => {
  if (slideToNextInput) {
    return (
      <div
        tabIndex="0"
        role="button"
        onkeyPress={() => {}}
        aria-pressed="false"
        onClick={handleBackClick}
        className={`chevron-left ${classNames ? '' : 'mt-20'}`}
      >
        <Chevron />
      </div>
    );
  }
  return null;
};

const Authentication = ({ ...props }) => {
  let { title } = props;
  const { slideToNextInput, classNames } = props;
  if (slideToNextInput) {
    title = 'Type your password';
  }
  return (
    <Wrapper classNames={classNames}>
      <GoToPrev {...props} />
      <h2 className="text-center pt-4 mb-0 auth-title">{title}</h2>
      <AuthForm {...props} />
    </Wrapper>
  );
};

const Container = ({ ...props }) => {
    const { authModal } = props;
  const className = 'pt-2 mx-auto col-lg-4 col-md-6 col-sm-8';
  const authClass = authModal ? '' : className;
  return (
    <div className={authClass}>
      <Authentication {...props} />
    </div>
  );
};

export default Container;

Wrapper.defaultProps = {
  children: <div />,
  classNames: ''
};

Wrapper.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string
};

Authentication.defaultProps = {
  title: '',
  classNames: '',
  slideToNextInput: false
};

GoToPrev.defaultProps = {
  slideToNextInput: false,
  classNames: '',
  handleBackClick: () => {}
};

GoToPrev.propTypes = {
  classNames: PropTypes.string,
  handleBackClick: PropTypes.func,
  slideToNextInput: PropTypes.bool
};

Authentication.propTypes = {
  title: PropTypes.string,
  classNames: PropTypes.string,
  slideToNextInput: PropTypes.bool
};

Container.defaultProps = {
  authModal: false
};

Container.propTypes = {
  authModal: PropTypes.bool
};
