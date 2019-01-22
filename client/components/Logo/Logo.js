/* eslint-disable react/prop-types */
import React from 'react';
import bukkaLogo from '../../images/bukka_logo.png';
import classes from './Logo.css';

/**
 * @description logo
 * @function logo
 * @param {*} props
 * @returns {JSX} jsx
 */
const logo = () => <img className={classes.Logo} src={bukkaLogo} alt="bukka-png" />;

export default logo;
