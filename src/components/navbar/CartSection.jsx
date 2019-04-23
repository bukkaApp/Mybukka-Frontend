import React from 'react';

import PropTypes from 'prop-types';
import QuantityIndicator from 'Components/badge/QuantityIndicator';
import Cart from 'Icons/Cart';

const CartSection = ({ handleClick }) => (
  <div
    onClick={handleClick}
    tabIndex="0"
    aria-pressed="false"
    role="button"
    className="cart-section"
  >
    <Cart />
    <QuantityIndicator />
  </div>
);

export default CartSection;

CartSection.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
