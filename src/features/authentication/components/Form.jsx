import React from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import NavLink from 'Components/navlink/Navlink';

import TextField from '../common/TextField';

import './form.scss';

const signUpTextOption = 'Already have an account?';

const signInTetxtOptions = 'New to Bukka?';

const FormOptions = ({ type }) => (
  <div className="form-options padding">
    <p>{type ? signInTetxtOptions : signUpTextOption}</p>
    <NavLink
      href={type ? '/signup' : '/login'}
      classNames="btn btn-link"
      text={type ? 'SIGN UP' : 'LOG IN'}
    />
  </div>
);

const TermsAndConditions = () => (
  <div className="col-lg-12 padding terms">
    <p>
      By clicking the Sign Up or Facebook button, you agree to our{' '}
      <NavLink classNames="link" href="/" text="Terms of Service " />
      and <NavLink classNames="link" href="/" text="Privacy Policy" />.
    </p>
  </div>
);

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
    {!type && <TermsAndConditions />}
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
      classNames="facebk-btn btn col-md-12"
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
  validationErrors: {}
};

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  domStructure: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  validationErrors: PropTypes.objectOf(PropTypes.string),
  isFormCompleted: PropTypes.bool,
  type: PropTypes.string
};

FormOptions.defaultProps = {
  type: 'text'
};

FormOptions.propTypes = {
  type: PropTypes.string
};

LargeButton.defaultProps = {
  type: 'text'
};

LargeButton.propTypes = {
  type: PropTypes.string
};
