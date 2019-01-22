/* eslint-disable react/prop-types */
import React from 'react';
import classes from './SocialBtn.css';
/**
 * @description socialBtn
 * @function socialBtn
 * @param {*} props
 * @returns {JSX} jsx
 */
const socialBtn = props => (
  <div className={['form-group mt-2 mb-2', classes.formPadding].join(' ')}>
    <button className={['btn', classes.fbBtn, classes.btnAction, 'col-md-12'].join(' ')}>
      {props.children}
      <i className={[props.socialIcon, 'fa-2x', classes.fbRight].join(' ')} />
    </button>
  </div>
);

export default socialBtn;
