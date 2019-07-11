import React from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import ButtonGroup from 'Components/button/ButtonGroup';

const ToggleQuantity = ({ text, id, handleClick }) => (
  <Button
    text={text}
    classNames="default-btn toggle-quantity d-block"
    type="button"
    handleClick={handleClick}
    id={id}
  />
);

const Quantity = ({ currentQuantity }) => (
  <Button
    text={`${currentQuantity}`}
    classNames="default-btn d-block"
    type="button"
    handleClick={() => {}}
  />
);

const SelectQuantityButtons = ({ manipulateMeal, quantity, itemIsInCart }) => (
  <ButtonGroup classNames="merge-group d-flex justify-content-center select-quantity-btns">
    {itemIsInCart ? (
      <p className="added-text">ADDED</p>
    ) : (
      <>
        <ToggleQuantity text="-" handleClick={() => manipulateMeal('reduce')} />
        <Quantity currentQuantity={quantity} />
        <ToggleQuantity
          text="+"
          handleClick={() => manipulateMeal('increase')}
        />
      </>
    )}
  </ButtonGroup>
);

export default SelectQuantityButtons;

ToggleQuantity.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Quantity.propTypes = {
  currentQuantity: PropTypes.number.isRequired
};

SelectQuantityButtons.propTypes = {
  manipulateMeal: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired
};
