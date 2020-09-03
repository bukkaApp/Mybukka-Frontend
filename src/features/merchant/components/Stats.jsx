import React from 'react';
import './stats.scss';

const Stats = () => (
  <div className="wrap">
    <div className="wrap-stats">
      <ul className="p-0 d-flex-column d-md-flex d-lg-flex d-xl-flex">
        <li className="col p-stats">
          <h4 className="text-center">
            <strong className="d-block">44,000+</strong>
            merchant partners
          </h4>
        </li>
        <li className="col p-stats">
          <h4 className="text-center">
            <strong className="d-block">2,941</strong>
            cities serviced across Nigeria
          </h4>
        </li>
        <li className="col p-stats">
          <h4 className="text-center">
            <strong className="d-block">500,000</strong>
            active fleet members
          </h4>
        </li>
      </ul>
    </div>
  </div>
);

export default Stats;
