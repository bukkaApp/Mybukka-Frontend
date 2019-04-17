import React from 'react';

import PropTypes from 'prop-types';
import shortId from 'shortid';
import Price from '../badge/Price';
import Times from '../icons/Times';
import Button from '../button/Button';

import './cartdropdown.scss';

const cart = [
  {
    title: 'Freshly Brewed Coffee',
    category: 'Tall',
    price: 2000
  },
  {
    title: 'Freshly Brewed Coffee',
    category: 'Tall',
    price: 2000
  },
  {
    title: 'Freshly Brewed Coffee',
    category: 'Tall',
    price: 2000
  }
];

const SubTotal = ({ orderItems }) => {
  const total = orderItems.reduce((a, b) => b.price + a, 0);

  return (
    <div className="custom-cart-subtotal">
      <p className="m-0">
        <span>Subtotal</span>
      </p>
      <p className="m-0 text-color">
        <span>₦{total}.00</span>
      </p>
    </div>
  );
};

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

const CartItems = ({ title, category, price, number }) => (
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
      <span className="cart-cancel-icon">
        <Times />
      </span>
    </div>
  </div>
);

const CartDropdown = ({ focus, handleClick }) => {
  const handleCheckoutMode = () => {
    handleClick(true);
  };

  if (!focus || (focus && cart.length <= 0)) {
    return null;
  }
  return (
    <div className={`cart-container ${cart.length <= 0 ? 'd-none' : ''}`}>
      <div>
        <CartHeader />
        <div className={`custom-cart-body ${
          cart.length > 2 ? 'cart-body-height' : ''
        }`}
        >
          {cart.map((el, idx) => (<CartItems
            key={shortId.generate()}
            title={el.title}
            category={el.category}
            price={el.price}
            number={idx + 1}
          />))}
        </div>
        <SubTotal orderItems={cart} />
        <CheckoutBtn handleClick={handleCheckoutMode} />
      </div>
    </div>
  );
};

export default CartDropdown;

CheckoutBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};

CartDropdown.propTypes = {
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired
};

SubTotal.propTypes = {
  orderItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ])).isRequired
};

CartItems.defaultProps = {
  title: '',
  category: '',
  price: ''
};

CartItems.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  number: PropTypes.number.isRequired,
};
