/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import sellingPoint from '../common/img/selling-points.png';
import footprint from '../common/img/footprint.png';
import customers from '../common/img/customers.png';
import revenue from '../common/img/revenue.png';

import './sellingpoint.scss';

const SellingPoint = () => (
  <section id="selling-points" className="container-fluid mx-auto text-center">
    <img src={sellingPoint} alt="" />
    <h3>Move Your Business Forward</h3>
    <p>
      It's no wonder thousands of merchants work with MyBukka to power local
      deliveries. Tap into the nation's largest on-demand delivery network and
      start bringing your customers the products they love in a matter of
      minutes.
    </p>
    <ul className="p-0 d-flex-column d-md-flex d-lg-flex d-xl-flex">
      <li className="col">
        <img src={footprint} alt="" />
        <h4>Expand Your Footprint</h4>
        <p>Reach customers in new neighborhoods across the city</p>
      </li>
      <li className="col">
        <img src={customers}  alt="" />
        <h4>Gain New Customers</h4>
        <p>Increase your visibility with a customized digital storefront</p>
      </li>
      <li className="col">
        <img src={revenue}  alt="" />
        <h4>Grow Revenue Faster</h4>
        <p>
          On average, businesses see a 4X increase in orders after partnering
          with MyBukka
        </p>
      </li>
    </ul>
  </section>
);

export default SellingPoint;
