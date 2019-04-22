import React from 'react';
import Brand from 'Components/brand/Brand';
// import Container from 'Components/container/Container';
import Iconic from './Iconic';

import './banner-section.scss';

const BannerSection = () => (
  <div className="support-banner-section" data-cy="page-header">
    <div className="support-brand">
      <Brand />
    </div>
    <div>
      <div className="pen-down">
        <img src="https://res.cloudinary.com/deqt3envc/image/upload/v1555436392/pen.jpg" alt="dd" className="pen-down-img" />
      </div>
      <div className="monitoring-section">
        <img src="https://res.cloudinary.com/deqt3envc/image/upload/v1555436393/work-desk.jpg" alt="dd" className="monitoring-section-img" />
      </div>
      <div className="custom-help-section">
        <a className="custom-help-section-text" href="/buyer">
          <span>Help</span>
        </a>
      </div>
      <div className="support-search-section">
        <div className="support-search-content">
          <div data-cy="search-button" className="css-4g6ai3">
            <Iconic />
          </div>
          <input
            type="text"
            data-cy="search-input"
            placeholder="Search..."
            className="support-search-input"
            onChange={() => {}}
            defaultValue=""
          />
        </div>
      </div>
    </div>
  </div>
);

export default BannerSection;