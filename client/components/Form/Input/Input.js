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
  <div className={[`form-group${props.touched && !props.value ? ' hasError' : ''}`, classes.formPadding].join(' ')}>
    <input
      {...props.attributeConfig}
      className={['form-control', classes.formInput].join(' ')}
      name={props.name}
      value={props.valued}
      onChange={props.changed}
    />
    {props.touched && !props.matched &&
      <div className={classes.helpBlock}>{props.errorMsg}</div>
    }
  </div>
);

export default Input;
