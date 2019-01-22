/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './AltForm.css';

/**
 * @description AltForm
 * @function AltForm
 * @param {*} props
 * @returns {JSX} jsx
 */
const AltForm = props => (
  <div className={classes.Alt}>
    <p>{props.children}</p>
    <Link to={props.linkTo} className="btn btn-link">{props.altText}</Link>
  </div>
);

export default AltForm;
