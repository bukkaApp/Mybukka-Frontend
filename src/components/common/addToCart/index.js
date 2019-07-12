import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'Components/modal';
import Row from 'Components/grid/Row';

import OrderOptions from './OrderOptions';
import MealImage from './MealImage';

import './addToCart.scss';

const AddToCart = ({ mealToDisplay }) => (
  <>
    {Object.keys(mealToDisplay).length > 0 && (
      <Modal classNames="order-meals-section" dataTarget="mealModal">
        <Row classNames="order-meals-section">
          <MealImage imageUrl={mealToDisplay.imageUrl} />
          <OrderOptions {...mealToDisplay} />
        </Row>
      </Modal>
    )}
  </>
);

const mapStateToProps = ({ fetchBukkaMenuReducer: { mealToDisplay } }) => ({
  mealToDisplay
});

export default connect(
  mapStateToProps,
  null
)(AddToCart);

AddToCart.defaultProps = {
  imageUrl: ''
};

AddToCart.propTypes = {
  imageUrl: PropTypes.string,
  mealToDisplay: PropTypes.shape({}).isRequired,
};
