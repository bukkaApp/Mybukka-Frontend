/* eslint-disable react/prop-types */
import React from 'react';
import bukkaLogo from './bukka_logo.png';
import './Logo.scss';

/**
 * @description logo
 * @function logo
 * @param {*} props
 * @returns {JSX} jsx
 */
const logo = () => <img className="logo" src={bukkaLogo} alt="bukka-png" />;

export default logo;
