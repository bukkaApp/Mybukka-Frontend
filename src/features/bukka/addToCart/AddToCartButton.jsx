import React from 'react';
import PropTypes from 'prop-types';

import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';
import Button from 'Components/button/Button';

import './addToCartButton.scss';

const AddToCartButton = ({ price, handleClick }) => (
  <Column classNames="col-12 col-sm-12 col-xs-12 col-md-12 col-lg-8">
    <Button
      handleClick={handleClick}
      classNames="primary-button add-to-cart-button"
      type="button"
      dataDismiss="modal"
    >
      <Row>
        <Column classNames="col-6">
          <span className="add-to-cart-text">ADD TO CART</span>
        </Column>
        <Column classNames="col-6">
          <span className="price-cart-button">₦{price}.00</span>
        </Column>
      </Row>
    </Button>
  </Column>
);

export default AddToCartButton;

AddToCartButton.propTypes = {
  price: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};
