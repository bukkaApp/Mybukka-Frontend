import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/button/Button';

const Divider = () => (
  <div className="divider-box mt-2 mb-2">
    <div className="divider">
      <span>or</span>
    </div>
  </div>
);

const SubmitButton = ({ ...props }) => (
  <div className="padding">
    <Button {...props} />
  </div>
);

const AuthByFacebook = props => <SubmitButton {...props} />;

const AuthButtonGroup = props => (
  <Fragment>
    <SubmitButton
      type="submit"
      id="submit"
      classNames={
        !props.isFormCompleted
          ? 'disabled col-md-12 primary-button mt-5'
          : 'button col-md-12 primary-button mt-5'
      }
      text={props.title}
      key="0"
      handleClick={() => {}}
    />
    <Divider />
    <AuthByFacebook
      type="button"
      href="/"
      key="1"
      classNames="facebk-btn col-md-12"
      text="Facebook"
      handleClick={() => {}}
    />
  </Fragment>
);

export default AuthButtonGroup;

AuthButtonGroup.defaultProps = {
  isFormCompleted: false,
  title: '',
};

AuthButtonGroup.propTypes = {
  isFormCompleted: PropTypes.bool,
  title: PropTypes.string,
};

SubmitButton.defaultProps = {
  title: ''
};

SubmitButton.propTypes = {
  title: PropTypes.string
};
