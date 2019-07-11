import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';
import updateCartAction from 'Redux/updateCartAction';
import manipulateMealAction from 'Redux/manipulateMealAction';

import SelectQuantityButtons from './SelectQuantityButtons';
import AddToCartButton from './AddToCartButton';

import './actionSection.scss';

const ActionSection = ({
  price,
  addToCart,
  quantity,
  manipulateMeal,
  mealToDisplay,
  itemIsInCart,
}) => (
  <Row classNames="action-section">
    <Column classNames="col-lg-4 d-none d-lg-block quantity-toggler-buttons">
      <SelectQuantityButtons
        quantity={quantity}
        manipulateMeal={manipulateMeal}
        itemIsInCart={itemIsInCart}
      />
    </Column>
    <AddToCartButton
      price={price}
      handleClick={() => addToCart(mealToDisplay, true)}
    />
  </Row>
);

const mapStateToProps = ({
  fetchBukkaMenuReducer: { mealToDisplay },
  cartReducer: { items }
}) => ({
  mealToDisplay,
  itemIsInCart:
    items.filter(item => item.slug === mealToDisplay.slug).length > 0
});

export default connect(mapStateToProps, {
  addToCart: updateCartAction,
  manipulateMeal: manipulateMealAction
})(ActionSection);

ActionSection.propTypes = {
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  manipulateMeal: PropTypes.func.isRequired
};
