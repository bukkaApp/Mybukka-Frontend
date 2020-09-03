import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './quantityIndicator.scss';

const QuantityIndicator = ({ quantity }) => (
  <div className="quantity-badge">{quantity}</div>
);

const mapStateToProps = ({ cartReducer: { items } }) => {
  const qty = items.reduce((val, itm) => val + itm.quantity, 0);
  return ({
    quantity: qty
  });
};

export default connect(
  mapStateToProps,
  null
)(QuantityIndicator);

QuantityIndicator.propTypes = {
  quantity: PropTypes.number.isRequired
};
