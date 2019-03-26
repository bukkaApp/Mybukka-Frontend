import React from 'react';
import PropTypes from 'prop-types';

const Order = ({ quantity, orderId }) => (
  <div className="history-order">
    <h5 className="font-size-14">Order {orderId}</h5>
    <h5 className="light font-size-13">{quantity} Items</h5>
  </div>
);

export default Order;

Order.propTypes = {
  orderId: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired
};
