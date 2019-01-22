/* eslint-disable react/prop-types */
import React from 'react';
import classes from './Input.css';

/**
 * @description Input
 * @function Input
 * @param {*} props
 * @returns {JSX} jsx
 */
const Input = props => (
  <div className={['form-group', classes.formPadding].join(' ')}>
    <input
      {...props.attributeConfig}
      className={['form-control', classes.formInput].join(' ')}
      name={props.name}
      value={props.password}
      onChange={props.change}
      onFocus={props.focus}
    />
  </div>
);

export default Input;
