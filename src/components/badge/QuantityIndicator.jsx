import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './quantityIndicator.scss';

const QuantityIndicator = ({ quantity }) => (
  <div className="quantity-badge">{quantity}</div>
);

const mapStateToProps = ({ fetchBukkaMenuReducer: { cart } }) => ({
  quantity: cart.length
});

export default connect(
  mapStateToProps,
  null
)(QuantityIndicator);

QuantityIndicator.propTypes = {
  quantity: PropTypes.number.isRequired
};
