import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import manipulateSubmenusAction from 'Redux/manipulateSubmenusAction';
import Modal from 'Components/modal';
import Row from 'Components/grid/Row';

import OrderOptions from './OrderOptions';
import MealImage from './MealImage';

import './addToCart.scss';

const AddToCart = ({ mealToDisplay, manipulateSubmenus }) => (
  <>
    {Object.keys(mealToDisplay).length > 0 && (
      <Modal classNames="order-meals-section" dataTarget="mealModal">
        <Row classNames="order-meals-section">
          <MealImage imageUrl={mealToDisplay.imageUrl} />
          <OrderOptions {...mealToDisplay} manipulateSubmenus={manipulateSubmenus} />
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
  {
    manipulateSubmenus: manipulateSubmenusAction
  }
)(AddToCart);

AddToCart.defaultProps = {
  imageUrl: '',
};

AddToCart.propTypes = {
  imageUrl: PropTypes.string,
  manipulateSubmenusAction: PropTypes.func.isRequired,
  mealToDisplay: PropTypes.shape({}).isRequired,
};
