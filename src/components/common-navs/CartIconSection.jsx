import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CartItems from 'Components/common/CartItems';
import Button from 'Components/button/Button';
import Cart from 'Icons/Cart';

import './cartIconSection.scss';

const CartIconSection = ({ cartItemsQuantity }) => (
  <div className="cart-icon-section d-flex justify-content-end">
    <Button
      classNames="cart-icon-indicator-button dropdown-toggle cart-button border"
      type="button"
      handleClick={() => ({})}
      dataToggle="dropdown"
      aria-haspopup="true"
      id="dropdownMenuButton"
    >
      <span className="cart-icon-column">
        <Cart />
      </span>
      <span className="divider-cart-icon" />
      <span className="quantity-count">{cartItemsQuantity} ITEMS</span>
    </Button>
    <CartItems />
  </div>
);

const mapStateToProps = ({ fetchBukkaMenuReducer: { cart } }) => ({
  cartItemsQuantity: cart.length,
});

export default connect(
  mapStateToProps,
  null
)(CartIconSection);

CartIconSection.propTypes = {
  cartItemsQuantity: PropTypes.number.isRequired
};
