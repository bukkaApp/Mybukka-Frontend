/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Images from '../common/img/experience.png';

import './experience.scss';

const Experience = () => {
  return (
    <section id="experience" className="text-center">
      <img src={Images} alt="" />
      <h3>The MyBukka Experience</h3>
      <p>
        We understand that when it comes to your brand, customer experience is
        key. Which is why we handle every detail - from carefully vetting our
        drivers to ensuring your product is delivered in a fresh and timely
        fashion - so you don't have to. That's our promise to you, 24/7.
      </p>
      <NavLink to="/merchant.mybukka.com/signup">
        <Button variant="info" size="lg" className="experience-btn">
          Sign Me Up
        </Button>
      </NavLink>
    </section>
  );
};

export default Experience;
