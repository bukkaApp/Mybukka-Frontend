import React from 'react';
import PropTypes from 'prop-types';

import Column from 'Components/grid/Column';
import Row from 'Components/grid/Row';
import SelectQuantityButtons from './SelectQuantityButtons';
import AddToCartButton from './AddToCartButton';

import './actionSection.scss';

const ActionSection = ({ price, handleClick }) => (
  <Row classNames="action-section">
    <Column classNames="col-lg-4 d-none d-lg-block quantity-toggler-buttons">
      <SelectQuantityButtons />
    </Column>
    <AddToCartButton price={price} handleClick={handleClick} />
  </Row>
);

export default ActionSection;

ActionSection.propTypes = {
  price: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
