/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Image from '../common/img/gal-2.jpeg';

import './testimonial.scss';

const Testimonial = () => (
  <section id="testimonials" className="container-fluid">
    <div className="bamboo-sushi d-flex">
      <img
        src={Image}
        alt="bamboo-sushi"
        className="img d-none p-0 d-lg-block col-lg-4 col-xl-4"
      />
      <div className="quote col-12 col-md-12 col-lg-8">
        <p className="text">
          <span className="quot">“</span>
          We love making people happy, and MyBukka allows us to do this outside
          of the four walls of our own restaurant, which is very cool!
          <span className="quot">”</span>
        </p>
        <p className="cite">
          Kristofor Lofgren, CEO
          <br />
          Bamboo Sushi
        </p>
      </div>
    </div>
    <div className="patxis-pizza d-flex">
      <div className="quote col-12 col-md-12 col-lg-8">
        <p className="text">
          <span className="quote-text">
            "Best in class delivery - that’s MyBukka"
          </span>
        </p>
        <p className="cite">
          Bill Freeman, CEO
          <br />
          Patxi's Pizza
        </p>
      </div>
      <img
        src={Image}
        alt="bamboo-sushi"
        className="img d-none p-0 d-lg-block col-lg-4 col-xl-4"
      />
    </div>
    <div className="tender-greens d-flex">
      <img
        src={Image}
        alt="bamboo-sushi"
        className="img d-none p-0 d-lg-block col-lg-4 col-xl-4"
      />
      <div className="quote col-12 col-md-12 col-lg-8">
        <p className="text">
          <span className="quot">“</span>
          Having MyBukka as our preferred delivery partner is a wonderful
          service for our guests. They are delighted to have the convenience of
          Tender Greens delivered on-demand wherever they are and whenever they
          want our food!
          <span className="quot">”</span>
        </p>
        <p className="cite">
          Christina Wong, Brand Expression Director
          <br />
          Tender Greens
        </p>
      </div>
    </div>
  </section>
);

export default Testimonial;
