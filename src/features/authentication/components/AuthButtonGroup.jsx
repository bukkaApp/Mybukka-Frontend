import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import Button from 'Components/button/Button';

const Divider = () => (
  <div className="divider-box padding mt-2 mb-2">
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

const AuthButtonGroup = props => (
  <Fragment>
    <SubmitButton
      type="submit"
      id="submit"
      classNames={`col-md-12 primary-button mt-5 ${!props.isFormCompleted ? 'disabled' : 'button'}`}
      text={props.title}
      key="0"
      handleClick={() => {}}
    />
    <Divider />
    <div className="padding">
      <FacebookLogin
        appId="816985088495917"
        cssClass="facebk-btn col-md-12"
        callback={props.handleFBAuth}
      />
    </div>
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
