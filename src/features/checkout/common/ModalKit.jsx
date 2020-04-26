import React from 'react';
import PropTypes, { any } from 'prop-types';
import Times from 'Components/icons/Times';
import Button from 'Components/button/Button';

export const ModalFooter = ({ handleIncrement, handleDecrement, newPrice }) => (
  <div className="modal-footer mx-auto bg-white border-top col-lg-5">
    <div className="control-instructions d-flex col-md-12 mx-auto">
      <div className="rounded-button d-flex">
        <Button
          handleclick={handleDecrement}
          className="increase btn btn-link text-muted"
        >-</Button>
        <div className="output">1</div>
        <Button
          handleclick={handleIncrement}
          className="decrease btn btn-link text-dark"
        >+</Button>
      </div>
      <Button
        className="add-to-cart btn btn-link"
      >
      ADD TO CART
        <span className="pl-3">
      ${newPrice}
        </span>
      </Button>
    </div>
  </div>
);

export const CloseModal = ({ handleClick }) => (
  <div
    role="button"
    aria-pressed="false"
    tabIndex="0"
    className="d-flex justify-content-end uppercase btn btn-link p-0
    mt-4 add-btn text-success"
  ><Times /></div>
);

export const ModalWrapper = props => (
  <div className="modal-root">
    <div className="custom-modal-container">
      <div className="relative-wrapper">
        {props.children}
      </div>
    </div>
  </div>
);

ModalFooter.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired
};

CloseModal.propTypes = {
  handleClick: PropTypes.func.isRequired
};

ModalWrapper.propTypes = {
  children: PropTypes.objectOf(any).isRequired
};
