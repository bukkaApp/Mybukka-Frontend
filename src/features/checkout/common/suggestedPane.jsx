import React from 'react';

import PropTypes from 'prop-types';

import Plus from 'Icons/Plus';
import Button from 'Components/button/Button';

const Add = ({ handleClick }) => (
  <Button
    type="button"
    handleClick={handleClick}
    classNames="btn-add-item-suggested uppercase btn btn-link p-0 text-success font-size-light-36"
  >
    <Plus />
  </Button>
);

const CartPane = ({ name, price, handleClick }) => (
  <div className="bg-white col-sm-8 col-md-8 col-8 suggested-item-card">
    <div className="d-flex justify-content-between">
      <div className="border-right col-md-10 capitalize">
        <h5 className="font-size-14">{name}</h5>
        <h5 className="font-size-14 suggested-item-price">{price}</h5>
      </div>
      <Add handleClick={handleClick} />
    </div>
  </div>
);

export default CartPane;

CartPane.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Add.propTypes = {
  handleClick: PropTypes.func.isRequired
};
