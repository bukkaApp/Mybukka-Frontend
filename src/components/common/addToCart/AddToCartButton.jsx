/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';
import Button from 'Components/button/Button';

import './addToCartButton.scss';

const AddToCartButton = ({
  price,
  handleClick,
  itemIsInCart,
  submenus,
}) => {
  const handleTotal = () => {
    let total = 0;
    const result = submenus.handleSubmenu(submenus.submenus, submenus.customerSubmenu);
    if (result.length > 0) {
      result.map(subMenu => subMenu.options.map((option) => {
        total += option.price || 0;
      }));
    }
    return total;
  };

  return (
    <Column classNames="col-12 col-sm-12 col-xs-12 col-md-12 col-lg-8">
      <Button
        handleClick={itemIsInCart ? () => ({}) : handleClick}
        classNames={
          itemIsInCart
            ? 'disabled-primary-button add-to-cart-button'
            : 'primary-button add-to-cart-button'
        }
        type="button"
        dataDismiss={itemIsInCart ? '' : 'modal'}
      >
        <Row>
          <Column classNames="col-6">
            <span className="add-to-cart-text">ADD TO CART</span>
          </Column>
          <Column classNames="col-6">
            <span className="price-cart-button">₦{handleTotal() + price}.00</span>
          </Column>
        </Row>
      </Button>
    </Column>
  );
};

const mapStateToProps = ({
  fetchBukkaMenuReducer: { mealToDisplay },
  // cartReducer: { items }
}) => ({
  mealToDisplay,
  // items,
  // itemIsInCart:
  // items.filter(item => item.slug === mealToDisplay.slug).length > 0
});

export default connect(
  mapStateToProps,
  null
)(AddToCartButton);

AddToCartButton.propTypes = {
  price: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};
