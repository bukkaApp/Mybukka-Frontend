import React from 'react';
import classes from './Divider.css';

/**
 * @description Divider
 * @function Divider
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const Divider = () => (
  <div className={classes.formPadding}>
    <div className={classes.formDivider}>
      <span>or</span>
    </div>
  </div>
);

export default Divider;
