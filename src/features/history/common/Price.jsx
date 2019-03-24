import React from 'react';
import PropTypes from 'prop-types';

const Price = ({ price }) => (
  <div className="history-price">
    <h5 className="text-muted">₦{price}</h5>
  </div>
);

export default Price;

Price.propTypes = {
  price: PropTypes.string.isRequired
};
