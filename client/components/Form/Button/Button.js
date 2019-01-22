/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Button.css';
/**
 * @description button
 * @function button
 * @param {*} props
 * @returns {JSX} jsx
 */
const button = props => (
  <div className={['form-group mt-2 mb-2', classes.formPadding].join(' ')}>
    <button className={['btn btn-primary', classes.btnAction, 'col-md-12'].join(' ')} disabled={!props.disabled}>
      {props.children}
    </button>
  </div>
);

export default button;
