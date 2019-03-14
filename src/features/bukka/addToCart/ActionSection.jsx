import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';

import SelectQuantityButtons from './SelectQuantityButtons';
import AddToCartButton from './AddToCartButton';
import addToCartAction from '../actionCreators/addToCartAction';
import manipulateMealAction from '../actionCreators/manipulateMealAction';

import './actionSection.scss';

const ActionSection = ({ price, addToCart, quantity, manipulateMeal }) => (
  <Row classNames="action-section">
    <Column classNames="col-lg-4 d-none d-lg-block quantity-toggler-buttons">
      <SelectQuantityButtons
        quantity={quantity}
        manipulateMeal={manipulateMeal}
      />
    </Column>
    <AddToCartButton price={price} handleClick={addToCart} />
  </Row>
);

export default connect(
  () => ({}),
  { addToCart: addToCartAction, manipulateMeal: manipulateMealAction }
)(ActionSection);

ActionSection.propTypes = {
  price: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  manipulateMeal: PropTypes.func.isRequired
};
