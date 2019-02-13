import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'Components/button/Button';
import ButtonGroup from 'Components/button/ButtonGroup';

const ToggleQuantity = ({ handleClick, text }) => (
  <Button
    text={text}
    classNames="default-btn toggle-quantity d-block"
    type="button"
    handleClick={handleClick}
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

const SelectQuantityButtons = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <ButtonGroup classNames="merge-group d-flex justify-content-center">
      <ToggleQuantity text="-" handleClick={() => setQuantity(quantity - 1)} />
      <Quantity handleClick={() => {}} currentQuantity={quantity} />
      <ToggleQuantity text="+" handleClick={() => setQuantity(quantity + 1)} />
    </ButtonGroup>
  );
};

export default SelectQuantityButtons;

ToggleQuantity.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

Quantity.propTypes = {
  currentQuantity: PropTypes.number.isRequired,
};
