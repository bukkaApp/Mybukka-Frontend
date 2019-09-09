/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import removeFromCart from 'Redux/removeFromCart';
import shortId from 'shortid';
import Price from '../badge/Price';
import Times from '../icons/Times';
import Button from '../button/Button';

import './cartdropdown.scss';

export const SubTotal = ({ totalPriceInCart }) => (
  <div className="custom-cart-subtotal">
    <p className="m-0">
      <span>Subtotal</span>
    </p>
    <p className="m-0 text-color">
      <span>₦{totalPriceInCart}.00</span>
    </p>
  </div>
);

export const CheckoutBtn = ({ handleClick, bukka }) => (
  <Link to={`/merchant/${bukka}/checkout`}>
    <Button
      handleClick={handleClick}
      type="button"
      classNames="cart-checkout-btn"
    >
      <span className="cart-checkout-btn-text">
        <span>Checkout</span>
      </span>
    </Button>
  </Link>
);

const CartHeader = () => (
  <div className="custom-cart-header">
    <div className="cart-header-content">
      <h2 className="cart-header-h2">
        <span>Items</span>
      </h2>
    </div>
  </div>
);

export const CartItems = ({
  title,
  category,
  price,
  quantity,
  removeFromCartAction
}) => (
  <div className="cart-body-content">
    <div className="custom-cart-section">
      <div className="custom-cart-item">
        <div className="custom-item-number">{quantity}x</div>
        <div className="custom-cart-list">
          <div className="custom-cart-item-name">{title}</div>
          <div className="custom-cart-item-category">{category}</div>
        </div>
        <Price price={price} />
      </div>
      <span
        onClick={removeFromCartAction}
        tabIndex={0}
        role="button"
        className="cart-cancel-icon"
      >
        <Times />
      </span>
    </div>
  </div>
);

const CartIconSection = ({
  orderItems,
  orderQuantity,
  focus,
  handleClick,
  removeFromCartAction,
  totalCost
}) => {
  const handleCheckoutMode = () => {
    handleClick(true);
  };

  const handleCategoryText = (item) => {
    let result = '';
    if (item.submenus.length > 0) {
      item.submenus.map((subMenu) => {
        subMenu.options.map((option) => {
          result += ` ${option.name},`;
        });
      });
    }
    const slicedResult = result.slice(0, 21);
    return slicedResult.slice(0, slicedResult.length - 1);
  };

  const handleEachCost = (item) => {
    let total = 0;
    if (item.submenus.length > 0) {
      item.submenus.map((subMenu) => {
        subMenu.options.map((option) => {
          total += option.price;
        });
      });
    }
    return total;
  };

  if (!focus || (focus && orderQuantity <= 0)) {
    return null;
  }

  useEffect(() => {
    console.log('orderItems', orderItems);
  });

  return (
    <div className={`cart-container ${orderQuantity <= 0 ? 'd-none' : ''}`}>
      <div>
        <CartHeader />
        <div
          className={`custom-cart-body ${
            orderQuantity > 2 ? 'cart-body-height' : ''
          }`}
        >
          {orderItems.map((item, index) => (
            <CartItems
              key={shortId.generate()}
              title={item.title}
              removeFromCartAction={() => removeFromCartAction(item.slug, index)}
              category={handleCategoryText(item) || item.category}
              price={(handleEachCost(item) + item.price) * item.quantity}
              quantity={item.quantity}
            />
          ))}
        </div>
        <SubTotal totalPriceInCart={totalCost} />
        <CheckoutBtn
          handleClick={handleCheckoutMode}
          bukka={orderItems[0].bukka}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ cartReducer: { items, totalCost } }) => ({
  orderQuantity: items.length,
  orderItems: items,
  totalCost
});

export default connect(
  mapStateToProps,
  { removeFromCartAction: removeFromCart }
)(CartIconSection);

CheckoutBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};

CartIconSection.propTypes = {
  removeFromCartAction: PropTypes.func.isRequired,
  totalCost: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  orderItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
  ).isRequired,
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
  removeFromCartAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number.isRequired
};
