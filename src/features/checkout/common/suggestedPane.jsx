import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import './modal.scss';

const Add = ({ handleClick }) => (
  <Button
    text="+"
    type="button"
    handleClick={handleClick}
    classNames="uppercase btn btn-link p-0
    add-btn text-success font-size-light-36"
  />
);

const cartPane = ({ name, price, handleClick }) => (
  <div className="p-0 bg-white mt-1 mb-1 mr-4 col-sm-8 col-md-8 col-8">
    <div className="d-flex justify-content-between p-2">
      <div className="border-right col-md-10 capitalize">
        <h5 className="font-size-14">{name}</h5>
        <h5 className="font-size-14">{price}</h5>
      </div>
      <Add handleClick={handleClick} />
    </div>
  </div>
);

export default cartPane;

cartPane.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Add.propTypes = {
  handleClick: PropTypes.func.isRequired
};
