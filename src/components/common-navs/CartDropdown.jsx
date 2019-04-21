import React from 'react';

import removeFromCartAction from 'Redux/removeFromCartAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import Price from '../badge/Price';
import Times from '../icons/Times';
import Button from '../button/Button';

import './cartdropdown.scss';

const SubTotal = ({ totalPriceInCart }) => (
  <div className="custom-cart-subtotal">
    <p className="m-0">
      <span>Subtotal</span>
    </p>
    <p className="m-0 text-color">
      <span>₦{totalPriceInCart}.00</span>
    </p>
  </div>
);

const CheckoutBtn = ({ handleClick }) => (
  <Button
    handleClick={handleClick}
    type="button"
    classNames="cart-checkout-btn"
  >
    <span className="cart-checkout-btn-text">
      <span>Checkout</span>
    </span>
  </Button>
);

const CartHeader = () => (
  <div className="custom-cart-header">
    <div className="cart-header-content">
      <h2 className="cart-header-h2"><span>Order</span></h2>
    </div>
  </div>
);

const CartItems = ({ title, category, price, number, removeFromCart }) => (
  <div className="cart-body-content">
    <div className="custom-cart-section">
      <div className="custom-cart-item">
        <div className="custom-item-number">{number}</div>
        <div className="custom-cart-list">
          <div className="custom-cart-item-name">
            {title}
          </div>
          <div className="custom-cart-item-category">
            {category}
          </div>
        </div>
        <Price price={price} />
      </div>
      <span
        onClick={removeFromCart}
        tabIndex={0}
        role="button"
        className="cart-cancel-icon"
      >
        <Times />
      </span>
    </div>
  </div>
);

const CartDropdown = ({
  orderItems,
  orderQuantity,
  focus,
  handleClick,
  removeFromCart,
  totalPriceInCart,
}) => {
  const handleCheckoutMode = () => {
    handleClick(true);
  };

  if (!focus || (focus && orderQuantity <= 0)) {
    return null;
  }
  return (
    <div className={`cart-container ${orderQuantity <= 0 ? 'd-none' : ''}`}>
      <div>
        <CartHeader />
        <div className={`custom-cart-body ${
          orderQuantity > 2 ? 'cart-body-height' : ''
        }`}
        >
          {orderItems.map((item, idx) => (<CartItems
            key={shortId.generate()}
            title={item.title}
            removeFromCart={() => removeFromCart(item.slug)}
            category={item.category}
            price={item.price}
            number={idx + 1}
          />))}
        </div>
        <SubTotal totalPriceInCart={totalPriceInCart} />
        <CheckoutBtn handleClick={handleCheckoutMode} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ fetchBukkaMenuReducer: { cart, totalPriceInCart } }) => ({
  orderQuantity: cart.length,
  orderItems: cart,
  totalPriceInCart
});

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCartAction }
)(CartDropdown);

CheckoutBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};

CartDropdown.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  totalPriceInCart: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  orderItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ])).isRequired,
  orderQuantity: PropTypes.number.isRequired
};

SubTotal.propTypes = {
  totalPriceInCart: PropTypes.number.isRequired
};

CartItems.defaultProps = {
  title: '',
  category: '',
  price: ''
};

CartItems.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  title: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  number: PropTypes.number.isRequired,
};
