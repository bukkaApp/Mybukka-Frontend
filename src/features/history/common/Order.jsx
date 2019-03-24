import React from 'react';
import PropTypes from 'prop-types';

const Order = ({ quantity, orderId }) => (
  <div className="history-order">
    <h5 className="">Order {orderId}</h5>
    <h5 className="">{quantity} Items</h5>
  </div>
);

export default Order;

Order.propTypes = {
  orderId: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired
};
