/* eslint-disable react/prop-types */
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
        size={mealToDisplay.imageUrl ? 'xl' : 'md'}
        show={modalShow}
        className="pl-0"
        centered
      >
        <Modal.Body className="order-meals-section">
          <Row classNames="order-meals-section mx-0">
            {
              mealToDisplay.imageUrl &&
              <MealImage
                toggleAddToCart={toggleAddToCart}
                imageUrl={mealToDisplay.imageUrl}
              />
            }
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
  manipulateSubmenus: PropTypes.func.isRequired,
  mealToDisplay: PropTypes.shape({}).isRequired,
  modalShow: PropTypes.bool.isRequired,
  toggleAddToCart: PropTypes.func.isRequired,
};
