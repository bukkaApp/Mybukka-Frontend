import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import ForgotPassword from '../common/ForgotPassword';
import TextField from '../common/TextField';
import Title from './Title';
import './authinputgroup.scss';


const AuthInputGroup = (props) => {
  if (props.title === 'Sign Up') {
    return (
      <div className="mt-1">
        <TextField {...props} className="pl-0" />
      </div>
    );
  }

  return (
    <Fragment>
      <Title {...props} />
      <div className="input-group-wrapper mt-9">
        <div className={`input-slide text-center ${props.slideToNextInput ? 'slide-next-input' : ''}`}>
          <TextField {...props} classNames="pl-0" />
        </div>
        <ForgotPassword {...props} />
      </div>
    </Fragment>
  );
};

export default AuthInputGroup;

AuthInputGroup.defaultProps = {
  title: 'Sign Up',
};

AuthInputGroup.propTypes = {
  title: PropTypes.string,
};

