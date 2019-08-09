import React from 'react';

import PropTypes from 'prop-types';

import SearchLocation from 'Components/common-navs/SearchLocation';

import './readyToOrderSection.scss';

const ReadyToOrderHeader = () => (
  <div className="header-section">
    <h2 className="header text-center"> Ready to order?</h2>
  </div>
);

const ReadyToOrderSection = ({ push }) => (
  <div className="ready-to-order-section">
    <div className="container">
      <ReadyToOrderHeader />
      <div className="search-location-section">
        <SearchLocation push={push} />
      </div>
    </div>
  </div>
);

export default ReadyToOrderSection;

ReadyToOrderSection.propTypes = {
  push: PropTypes.func.isRequired,
};
