/* eslint-disable react/prop-types */
import React from 'react';
import TextFields from '../common/textField';
import Button from 'Components/button/Button'; // eslint-disable-line
import Link from 'Components/navlink/Navlink'; // eslint-disable-line
import './form.scss';

const signUpTextOption = 'Already have an account?';

const signInTetxtOptions = 'New to Bukka?';

/**
 * @description AltForm
 * @function AltForm
 * @param {*} props
 * @returns {JSX} jsx
 */
const FormOptions = ({ type }) => (
  <div className="form-options padding">
    <p>{type ? signInTetxtOptions : signUpTextOption}</p>
    <Link
      href={type ? '/signup' : '/login'}
      className="btn btn-link"
      text={type ? 'SIGN UP' : 'LOG IN'}
    />
  </div>
);


const TermsAndConditions = () => (
  <div className="col-lg-12 padding">
    <p>By clicking the Sign Up or Facebook button,
        you agree to our <Link classNames="link" href="/" text="Terms of Service " />
        and <Link classNames="link" href="/" text="Privacy Policy" />.</p>
  </div>
);

const Divider = () => (
  <div className="divider-box mt-2 mb-2">
    <div className="divider">
      <span>or</span>
    </div>
  </div>
);

const LargeButton = ({ ...props }) => (
  <div key={props.type} className="padding">
    <Button key={props.type} {...props} />
  </div>
);

const FaceBookButton = LargeButton;

/**
 * @description form
 * @function form
 * @param {*} props
 * @returns {JSX} jsx
 */
const form = ({ handleChange, handleSubmit, inputData, isFormCompleted, type }) => (
  <form className="pb-3" name="form" onSubmit={handleSubmit}>
    <TextFields
      handleChange={handleChange}
      inputData={inputData}
    />
    { !type && <TermsAndConditions /> }
    <LargeButton
      type="submit"
      classNames="button btn col-md-12"
      text="Submit"
      handleClick={() => {}}
      disabled={!isFormCompleted}
    />
    <Divider />
    <FaceBookButton
      type="button"
      href="/"
      classNames="facebk-btn btn col-md-12"
      text={['Facebook',
        <i className={['fab fa-facebook fa-2x facebk-icon'].join('\n')} />]}
      handleClick={() => {}}
    />
    <FormOptions type={type} />
  </form>
);

export default form;
