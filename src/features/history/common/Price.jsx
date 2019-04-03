import React from 'react';
import PropTypes from 'prop-types';

const Price = ({ price }) => (
  <div className="history-price">
    <h5 className="text-color font-size-14">₦{price}</h5>
  </div>
);

export default Price;

Price.propTypes = {
  price: PropTypes.string.isRequired
};
