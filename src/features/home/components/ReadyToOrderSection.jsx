import React from 'react';

import SearchLocation from '../common/SearchLocation';

import './readyToOrderSection.scss';

const ReadyToOrderHeader = () => (
  <div className="header-section">
    <h2 className="header text-center"> Ready to order?</h2>
  </div>
);

const ReadyToOrderSection = () => (
  <div className="ready-to-order-section">
    <div className="container">
      <ReadyToOrderHeader />
      <div className="search-location-section">
        <SearchLocation />
      </div>
    </div>
  </div>
);

export default ReadyToOrderSection;