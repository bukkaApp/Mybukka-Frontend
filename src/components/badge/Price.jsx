import React from 'react';
import PropTypes from 'prop-types';

import './price.scss';

const Price = ({ price }) => <h4 className="price-badge">₦{price}.00</h4>;

export default Price;

Price.propTypes = {
  price: PropTypes.number.isRequired
};
