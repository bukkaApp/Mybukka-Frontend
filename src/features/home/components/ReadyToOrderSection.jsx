import React from 'react';

import SearchLocation from 'Components/places-suggest/SearchLocation';

import './readyToOrderSection.scss';

const ReadyToOrderHeader = () => (
  <div className="header-section">
    <h2 className="header text-center"> Ready to order?</h2>
    <p>Browse local resturants and businesses available for delivery by</p>
    <p>entering your address below.</p>
  </div>
);

const ReadyToOrderSection = () => (
  <div className="ready-to-order-section">
    <div className="container">
      <ReadyToOrderHeader />
      <div className="max-search-location mx-auto">
        <SearchLocation
          withLoading
          useCurrentLocationVisible
          chevronButtonVisible
          showDeliveryOrPickupNav
        />
      </div>
    </div>
  </div>
);

export default ReadyToOrderSection;

ReadyToOrderSection.propTypes = {};
