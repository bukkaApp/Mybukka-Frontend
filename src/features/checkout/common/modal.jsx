import React, { useState } from 'react';
import RadioInput from './RadioInput';
import { ModalWrapper, CloseModal, ModalFooter } from './ModalKit';
import './modal.scss';

const Modal = () => {
  const [showModal, setShowModal] = useState(true);
  const [initialPrice, setPrice] = useState(3.14);

  const openModal = () => {
    // document.body.classList.add('modal-open');
    setShowModal(true);
  };

  const hideModal = () => {
    // document.body.classList.remove('modal-open');
    setShowModal(false);
  };

  const increasePrice = () => {
    setPrice(initialPrice + 1);
  };

  const decreasePrice = () => {
    setPrice(initialPrice + 1);
  };

  return (
    showModal && <ModalWrapper>
      <div className="custom-modal px-5 mx-auto col-lg-5 overflow-y bg-white">
        <div className="row-fluid">
          <CloseModal handleClick={hideModal} />
          <div className="modal-title pb-4">
            <h1 className="font-size-24">Side of One Egg</h1>
          </div>
          <div className="d-flex justify-content-between border-bottom mb-1">
            <h4 className="font-size-12">HOW WOULD YOU LIKE YOUR EGGS?</h4>
            <h4 className="font-size-12">REQUIRED</h4>
          </div>
          <form action="">
            <RadioInput name="instruction" labelText="Over Easy" />
            <RadioInput name="instruction" labelText="Over Medium" />
            <RadioInput name="instruction" labelText="Scrambled" />
            <RadioInput name="instruction" labelText="Over Hard" />
            <RadioInput name="instruction" labelText="Sunny Side Up" />
            <RadioInput name="instruction" labelText="Poached" />
            <div className="col">
              <label
                htmlFor="instruction"
                className="pl-2 bold font-size-12"
              >
                Special Instruction
              </label>
              <textarea
                className="form-control instruction modal-instruction"
                placeholder="Add Instructions..."
                name=""
                id=""
                cols="30"
                rows="10"
              />
            </div>
          </form>
        </div>
      </div>
      <ModalFooter
        handleDecrement={decreasePrice}
        handleIncrement={increasePrice}
        newPrice={initialPrice}
      />
    </ModalWrapper>

  );
};

export default Modal;
