import React from 'react';
import PropTypes from 'prop-types';

import './price.scss';

const Price = ({ price, classNames }) => (
  <h4 className={classNames}>₦{price}.00</h4>
);

export default Price;

Price.defaultProps = {
  classNames: 'price-badge',
};

Price.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]).isRequired,
  classNames: PropTypes.string,
};
