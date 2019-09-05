import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import toggleAddToCartModal from 'Redux/toggleAddToCartModal';
import Modal from 'react-bootstrap/Modal';
import manipulateSubmenusAction from 'Redux/manipulateSubmenusAction';
// import Modal from 'Components/modal';
import Row from 'Components/grid/Row';

import OrderOptions from './OrderOptions';
import MealImage from './MealImage';

import './addToCart.scss';

const AddToCart = ({ mealToDisplay, manipulateSubmenus, modalShow, toggleAddToCart }) => (
  <>
    {Object.keys(mealToDisplay).length > 0 && (
      <Modal
        onHide={() => toggleAddToCart(false)}
        size="xl"
        show={modalShow}
        centered
      >
        <Modal.Body className="order-meals-section">
          <Row classNames="order-meals-section">
            <MealImage
              toggleAddToCart={toggleAddToCart}
              imageUrl={mealToDisplay.imageUrl}
            />
            <OrderOptions
              {...mealToDisplay}
              manipulateSubmenus={manipulateSubmenus}
              toggleAddToCart={toggleAddToCart}
            />
          </Row>
        </Modal.Body>
      </Modal>
    )}
  </>
);

const mapStateToProps = ({ fetchBukkaMenuReducer: { mealToDisplay, modalShow } }) => ({
  mealToDisplay,
  modalShow,
});

export default connect(
  mapStateToProps,
  {
    manipulateSubmenus: manipulateSubmenusAction,
    toggleAddToCart: toggleAddToCartModal,
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
