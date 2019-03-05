import React from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import NavLink from 'Components/navlink/Navlink';

import TextField from '../common/TextField';

import './form.scss';

const signUpTextOption = 'Already have an account?';

const signInTextOptions = 'New to Bukka?';

const FormOptions = ({ type }) => {
  const formType = type === 'SignUp';
  const AltOption = (
    <div className="form-options padding">
      <p>{formType ? signUpTextOption : signInTextOptions}</p>
      <NavLink
        href={formType ? '/login' : '/signup'}
        classNames="btn-link"
        text={formType ? 'LOG IN' : 'SIGN UP'}
      />
    </div>
  );
  return AltOption;
};

const TermsAndConditions = ({ type }) => {
  if (type === 'SignUp') {
    return (
      <div className="col-lg-12 padding terms">
        <p>
      By clicking the Sign Up or Facebook button, you agree to our{' '}
          <NavLink classNames="link" href="/" text="Terms of Service " />
      and <NavLink classNames="link" href="/" text="Privacy Policy" />.
        </p>
      </div>
    );
  }
  return null;
};

const ErrorMessage = ({ message }) => {
  if (message) {
    return (
      <div className="text-danger help-block text-center">{message}</div>
    );
  }
  return null;
};

const Divider = () => (
  <div className="divider-box mt-2 mb-2">
    <div className="divider">
      <span>or</span>
    </div>
  </div>
);

const preventDefault = event => event.preventDefault();

const LargeButton = ({ ...props }) => (
  <div className="padding test-button">
    <Button {...props} />
  </div>
);

const AuthByFacebook = props => <LargeButton {...props} />;

const Form = ({
  handleChange,
  handleSubmit,
  domStructure,
  validationErrors,
  isFormCompleted,
  errorMessage,
  type
}) => (
  <form
    className="pb-3 form-auth"
    name="form"
    onSubmit={!isFormCompleted ? preventDefault : handleSubmit}
  >
    <TextField
      handleChange={handleChange}
      domStructure={domStructure}
      validationErrors={validationErrors}
    />
    <ErrorMessage message={errorMessage} />
    <TermsAndConditions type={type} />
    <LargeButton
      type="submit"
      classNames={
        !isFormCompleted
          ? 'disabled col-md-12 primary-button'
          : 'button col-md-12 primary-button'
      }
      text="Submit"
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
    <FormOptions type={type} />
  </form>
);

export default Form;

Form.defaultProps = {
  domStructure: {},
  isFormCompleted: false,
  type: 'text',
  validationErrors: {},
  errorMessage: '',
};

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  domStructure: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  validationErrors: PropTypes.objectOf(PropTypes.string),
  isFormCompleted: PropTypes.bool,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
};

FormOptions.defaultProps = {
  type: ''
};

FormOptions.propTypes = {
  type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

TermsAndConditions.defaultProps = {
  type: ''
};

TermsAndConditions.propTypes = {
  type: PropTypes.string
};

LargeButton.defaultProps = {
  type: 'text'
};

LargeButton.propTypes = {
  type: PropTypes.string
};

ErrorMessage.defaultProps = {
  message: '',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
