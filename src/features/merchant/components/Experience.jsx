import React from 'react';

import Images from '../common/img/experience.png';

import './experience.scss';

const Experience = () => (
  <section id="experience" className="text-center">
    <img src={Images} alt="" />
    <h3>The Bukka Experience</h3>
    <p>
      We understand that when it comes to your brand, customer experience is
      key. Which is why we handle every detail - from carefully vetting our
      drivers to ensuring your product is delivered in a fresh and timely
      fashion - so you don&apos;t have to. That&apos;s our promise to you, 24/7.
    </p>
    <a className="experience-btn btn btn-lg" href="/merchant.mybukka.com/signup">Sign Me Up</a>
  </section>
);

export default Experience;
