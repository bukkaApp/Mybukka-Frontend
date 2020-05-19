import React, { memo } from 'react';

import PropTypes from 'prop-types';
import Chevron from 'Components/icons/ChevronRight';
import AuthForm from './AuthForm';

import './authentication.scss';

const GoToPrev = ({ handleBackClick, slideToNextInput, classNames }) => {
  if (slideToNextInput) {
    return (
      <div
        tabIndex="0"
        role="button"
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

const className = 'pt-2 mx-auto col-lg-4 col-md-6 col-sm-8';

const Authentication = ({ ...props }) => (
  <div className={props.hasModal ? '' : className}>
    <div className={`auth-wrapper ${props.classNames}`}>
      <GoToPrev {...props} />
      <h2 className="text-center pt-4 mb-0 auth-title">
        {props.slideToNextInput ? 'Type your password' : props.title}
      </h2>
      <AuthForm {...props} />
    </div>
  </div>
);

export default memo(Authentication);

Authentication.defaultProps = {
  title: PropTypes.string.isRequired,
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
  title: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  slideToNextInput: PropTypes.bool
};
