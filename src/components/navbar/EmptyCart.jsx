import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import removeFromCartAction from 'Redux/removeFromCartAction';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import Cart from 'Icons/Cart';
import { CartItems, CheckoutBtn, SubTotal } from '../common-navs/CartIconSection';
import './emptycart.scss';

export const CartDropdown = ({ children, display }) => (
  display &&
  <div className="cart-dropdown-menu" aria-labelledby="dropdownMenuButton">
    {children}
  </div>
);

const EmptyCart = ({ orderQuantity, bukka, orderItems, totalPriceInCart, removeFromCart }) => {
  if (orderQuantity > 0) {
    return (
      <div className="empty-cart-container">
        <div className="px-4 pt-2">
          <div className="cart-bukka-details">
            <h5 className="cart-bukka-name font-size-15">{bukka.name}</h5>
            <h5 className="cart-bukka-view-menu">
              <Link className="text-success view-menu-text" to={`/bukka/${bukka.slug}`}>
          VIEW MENU
              </Link>
            </h5>
          </div>
        </div>
        <div className={`custom-cart-body ${
          orderQuantity > 2 ? 'cart-body-height' : ''
        }`}
        >
          {orderItems.map((item, idx) => (
            <CartItems
              key={shortId.generate()}
              title={item.title}
              removeFromCart={() => removeFromCart(item.slug)}
              category={item.category}
              price={item.price}
              number={idx + 1}
            />))}
        </div>
        <SubTotal totalPriceInCart={totalPriceInCart} />
        <CheckoutBtn handleClick={() => {}} />
      </div>
    );
  }

  return (
    <div className="empty-cart-container">
      <div>
        <div className="empty-cart-section">
          <div className="d-flex">
            <div className="position-relative">
              <Cart />
              <div className="empty-cart-icon">0</div>
            </div>
            <div className="empty-cart-text">
              <div><span>Your cart is empty.</span></div>
              <div><span>Add items to get started.</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  fetchBukkaMenuReducer: { cart, totalPriceInCart },
  fetchBukkaReducer: { fetchedBukka }
}) => ({
  orderItems: cart,
  orderQuantity: cart.length,
  totalPriceInCart,
  bukka: fetchedBukka
});

export default connect(
  mapStateToProps,
  { removeFromCart: removeFromCartAction }
)(EmptyCart);

const objectOf = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ])
);

const propTypes = [
  PropTypes.bool,
  PropTypes.number,
  PropTypes.arrayOf(
    PropTypes.string,
  ),
  objectOf
];

EmptyCart.propTypes = {
  bukka: PropTypes.objectOf(
    PropTypes.oneOfType(
      propTypes
    )).isRequired,
  orderItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ])).isRequired,
  orderQuantity: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  totalPriceInCart: PropTypes.number.isRequired,
};

CartDropdown.defualtProps = {
  display: false
};

CartDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.bool
};
