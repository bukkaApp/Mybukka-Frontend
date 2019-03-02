import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';
import { Link } from 'react-router-dom';

import CancelSmall from 'Icons/CancelSmall';
import DropDown from 'Components/dropdown';
import Button from 'Components/button/Button';
import Price from 'Components/badge/Price';

import removeFromCart from 'Redux/removeFromCart';

import './cartItems.scss';

const SubtotalSection = ({ totalPriceInCart }) => (
  <div className="subtotal-section">
    <div className="subtotal-text">
      <h5> Subtotal</h5>
      <Price price={totalPriceInCart} />
    </div>
    <div className="checkout-button-section">
      <Link to="/checkout">
        <Button
          classNames="primary-block-btn"
          text="CHECKOUT"
          type="button"
          handleClick={() => ({})}
        />
      </Link>
    </div>
  </div>
);

const CartItem = ({ item, removeFromCartAction }) => (
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

const CartItems = ({ cartItems, removeFromCartAction, totalPriceInCart }) => {
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
        <SubtotalSection totalPriceInCart={totalPriceInCart} />
      </DropDown>
    );
  }
  return null;
};

const mapStateToProps = ({ cartReducer: { items, totalCost } }) => ({
  cartItems: items,
  totalPriceInCart: totalCost
});

export default connect(
  mapStateToProps,
  { removeFromCartAction: removeFromCart }
)(CartItems);

SubtotalSection.propTypes = {
  totalPriceInCart: PropTypes.number
};

CartItems.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeFromCart: PropTypes.func.isRequired
};

CartItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  removeFromCart: PropTypes.func.isRequired
};
