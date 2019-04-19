import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'Components/modal';
import Row from 'Components/grid/Row';

import OrderOptions from './OrderOptions';
import MealImage from './MealImage';

import './addToCart.scss';

const props = {
  name: 'sample meal',
  category: 'Breakfast',
  title: 'Amala',
  description: 'A very great plate of Amala that will make you beg for more',
  imageUrl:
    'https://res.cloudinary.com/dn93xk5ni/image/upload/v1549933392/burrito-chicken-close-up-461198_g9llka.jpg',
  price: 30
};

const AddToCart = () => (
  <Modal dataTarget="bukkaAddToCart" classNames="order-meals-section">
    <Row classNames="order-meals-section">
      <MealImage imageUrl={props.imageUrl} />
      <OrderOptions {...props} />
    </Row>
  </Modal>
);

export default AddToCart;

AddToCart.defaultProps = {
  imageUrl: ''
};

AddToCart.propTypes = {
  imageUrl: PropTypes.string
};
