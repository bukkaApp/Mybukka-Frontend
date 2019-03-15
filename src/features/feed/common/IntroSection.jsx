import React from 'react';

import PropTypes from 'prop-types';

import Container from 'Components/container';
import Navbar from 'Components/navbar';

import './introsection.scss';

const bgImage =
  'https://res.cloudinary.com/dn93xk5ni/image/upload/v1550614423/basil-cheese-close-up-1438672_qk0t5t.jpg';

const LargeTextSection = () => (
  <Container classNames="intro-text pl-2">
    <h2 className="larger-text text-left">You Crave.</h2>
    <h2 className="larger-text text-left">We get it.</h2>
  </Container>
);

const IntroSection = ({ push }) => (
  <div
    className="feed-intro-section img-fluid intro-section-fixed-height"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="intro-navbar-area">
      <Navbar push={push} bukka />
    </div>
    <div className="fixed-top text-left" style={{ zIndex: '100' }}>
      <LargeTextSection />
    </div>
  </div>
);

export default IntroSection;

IntroSection.propTypes = {
  push: PropTypes.func.isRequired,
};
