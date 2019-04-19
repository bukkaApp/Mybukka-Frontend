import React from 'react';

import QuantityIndicator from 'Components/badge/QuantityIndicator';
import Cart from 'Icons/Cart';

const CartSection = () => (
  <div className="cart-section">
    <Cart />
    <QuantityIndicator />
  </div>
);

export default CartSection;
