import React from 'react';

import PropTypes from 'prop-types';
import Navbar from '../../../components/navbar/index';

import './introsection.scss';

const IntroSection = ({ push }) => (
  <div className="intro-navbar-area">
    <Navbar push={push} bukka />
  </div>
);

export default IntroSection;

IntroSection.propTypes = {
  push: PropTypes.func.isRequired,
};
