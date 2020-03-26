import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import ForgotPassword from '../common/ForgotPassword';
import TextField from '../common/TextField';
import Title from './Title';
import './authinputgroup.scss';

const SignUpGroup = props => (
  <div className="mt-1">
    <TextField {...props} className="pl-0" />
  </div>
);

const SignInGroup = (props) => {
  const slideToNextInput =
    props.slideToNextInput ? 'slide-next-input' : '';

  return (
    <Fragment>
      <Title {...props} />
      <div className="input-group-wrapper mt-9">
        <div className={`input-slide text-center ${slideToNextInput}`}>
          <TextField {...props} classNames="pl-0" />
        </div>
        <ForgotPassword {...props} />
      </div>
    </Fragment>
  );
};

const AuthInputGroup = props => (
  <Fragment>
    {props.title === 'Sign Up' ?
      <SignUpGroup {...props} />
      : <SignInGroup {...props} />
    }
  </Fragment>
);

export default AuthInputGroup;

SignInGroup.defaultProps = {
  slideToNextInput: false
};

SignInGroup.propTypes = {
  slideToNextInput: PropTypes.bool
};

AuthInputGroup.defaultProps = {
  title: 'Sign Up',
};

AuthInputGroup.propTypes = {
  title: PropTypes.string,
};

