/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Form.css';
import Logo from '../Logo/Logo';

/**
 * @description Form
 * @function Form
 * @param {*} props
 * @returns {JSX} jsx
 */
const Form = props => (
  <main className={classes.formWrapper}>
    <div className={[classes.formContainer, 'mx-auto col-lg-4 col-md-6 col-sm-6'].join(' ')}>
      <h2>{props.heading}</h2>
      <form name="form" onSubmit={props.submit}>
        {props.children}
      </form>
    </div>
    <Logo />
  </main>
);

export default Form;
