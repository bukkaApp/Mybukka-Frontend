import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from 'Icons/Cart';
import './emptycart.scss';

export const CartDropdown = ({ children, display }) => (
  display &&
  <div className="cart-dropdown-menu" aria-labelledby="dropdownMenuButton">
    {children}
  </div>
);

const EmptyCart = ({ quantity }) => {
  if (quantity > 0) {
    return null;
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

const mapStateToProps = ({ fetchBukkaMenuReducer: { cart } }) => ({
  quantity: cart.length
});

export default connect(
  mapStateToProps,
  null
)(EmptyCart);

EmptyCart.propTypes = {
  quantity: PropTypes.number.isRequired
};

CartDropdown.defualtProps = {
  display: false
};

CartDropdown.propTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.bool
};
