import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import removeFromCart from 'Redux/removeFromCart';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import Cart from 'Icons/Cart';
import {
  CartItems,
  CheckoutBtn,
  SubTotal
} from '../common-navs/CartIconSection';
import './emptycart.scss';

export const CartDropdown = ({ children, display }) =>
  display && (
    <div className="cart-dropdown-menu" aria-labelledby="dropdownMenuButton">
      {children}
    </div>
  );

const EmptyCart = ({
  orderQuantity,
  orderItems,
  totalPriceInCart,
  removeFromCartAction,
  focus,
  bukka
}) => {
  if (orderQuantity > 0) {
    return (
      <div className="empty-cart-container">
        <div className="px-4 pt-2">
          <div className="cart-bukka-details">
            <h5 className="cart-bukka-name font-size-15">{bukka.split('-').slice(0, -1).join(' ')}</h5>
            <h5 className="cart-bukka-view-menu">
              <Link
                className="text-success view-menu-text"
                to={`/bukka/${bukka}`}
              >
                VIEW MENU
              </Link>
            </h5>
          </div>
        </div>
        <div
          className={`custom-cart-body ${
            orderQuantity > 2 ? 'cart-body-height' : ''
          }`}
        >
          {orderItems.map(item => (
            <CartItems
              key={shortId.generate()}
              title={item.title}
              removeFromCartAction={() => removeFromCartAction(item.slug)}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
        <SubTotal totalPriceInCart={totalPriceInCart} />
        <CheckoutBtn handleClick={() => {}} bukka={bukka} />
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
              <div>
                <span>Your cart is empty.</span>
              </div>
              <div>
                <span>Add items to get started.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  cartReducer: { items, totalCost },
}) => ({
  orderItems: items,
  orderQuantity: items.length,
  totalPriceInCart: totalCost,
  bukka: items.length > 0 ? items[0].bukka : items,
});

export default connect(
  mapStateToProps,
  { removeFromCartAction: removeFromCart }
)(EmptyCart);

const objectOf = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
);

const propTypes = [
  PropTypes.bool,
  PropTypes.number,
  PropTypes.arrayOf(PropTypes.string),
  objectOf
];

EmptyCart.propTypes = {
  bukka: PropTypes.objectOf(PropTypes.oneOfType(propTypes)).isRequired,
  orderItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
  ).isRequired,
  orderQuantity: PropTypes.number.isRequired,
  removeFromCartAction: PropTypes.func.isRequired,
  totalPriceInCart: PropTypes.number.isRequired
};

CartDropdown.defualtProps = {
  display: false
};

CartDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.bool
};
