import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';

import CancelSmall from 'Icons/CancelSmall';
import DropDown from 'Components/dropdown';
import Button from 'Components/button/Button';
import Price from 'Components/badge/Price';

import removeFromCartAction from './actionCreators/removeFromCartAction';

import './cartItems.scss';

const SubtotalSection = ({ cartItems, push }) => {
  const add = (accumulator, digit) => accumulator + digit;
  const totalPrice = cartItems.map(item => item.price).reduce(add);

  return (
    <div className="subtotal-section">
      <div className="subtotal-text">
        <h5> Subtotal</h5>
        <Price price={totalPrice} />
      </div>
      <div className="checkout-button-section">
        <Button
          classNames="primary-block-btn"
          text="CHECKOUT"
          type="button"
          handleClick={() => push()}
        />
      </div>
    </div>
  );
};

const CartItem = ({ item, removeFromCart }) => (
  <div className="single-cart-item-section">
    <div className="quantity-section">{item.quantity}</div>
    <div>{item.title}</div>
    <div>
      <Price price={item.price} />
    </div>
    <div
      className="remove-from-cart-icon-section"
      onClick={() => removeFromCart(item.slug)}
      tabIndex={0}
      role="button"
    >
      <CancelSmall />
    </div>
  </div>
);

const CartItems = ({ cartItems, removeFromCart }) => {
  if (cartItems.length > 0) {
    return (
      <DropDown>
        <div className="cart-order-heading">
          <h5>Order</h5>
        </div>
        {cartItems.map(cartItem => (
          <CartItem
            item={cartItem}
            key={shortId.generate()}
            removeFromCart={removeFromCart}
          />
        ))}
        <SubtotalSection cartItems={cartItems} />
      </DropDown>
    );
  }
  return null;
};

const mapStateToProps = ({ fetchBukkaMenuReducer: { cart } }) => ({
  cartItems: cart
});

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCartAction }
)(CartItems);

SubtotalSection.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

CartItems.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

CartItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};
