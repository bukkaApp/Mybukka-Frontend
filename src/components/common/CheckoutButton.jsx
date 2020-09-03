import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'Components/button/Button';

const CheckOutBtn = ({ orderQuantity }) => (
  <div className="checkout-button-section">
    <Link to="/checkout">
      <Button
        classNames="primary-block-btn d-flex"
        type="button"
        handleClick={() => ({})}
      >
        <span className="col-2">{orderQuantity || 1}</span>
        <span className="col-8">CHECKOUT</span>
      </Button>
    </Link>
  </div>
);

const CheckOutButton = ({ cartItems }) => {
  if (cartItems.length > 0) {
    return (
      <div
        style={{
          top: '85%',
          zIndex: 500,
          width: '100%',
        }}
        className="position-fixed d-md-none"
      >
        <div className="container">
          <CheckOutBtn orderQuantity={cartItems.length} />
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = ({ productsReducer: { cart } }) => ({
  cartItems: cart,
});

export default connect(
  mapStateToProps,
)(CheckOutButton);

CheckOutBtn.propTypes = {
  orderQuantity: PropTypes.number.isRequired
};

CheckOutButton.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

