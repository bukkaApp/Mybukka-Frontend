import React from 'react';
import Input from 'Components/input/InputField';
import RadioInput from './RadioInput';

const ModalFooter = () => (
  <div className="modal-footer">
    <div className="control-instructions">
      <div className="round-button">
        <button>-</button>
        <div className="output">1</div>
        <button>+</button>
      </div>
      <button>ADD TO CART <span className="pl-3">$3.14</span></button>
    </div>
  </div>
);

const CloseModal = () => (
  <div className="d-flex justify-content-end uppercase btn btn-link p-0
    add-btn text-success font-size-light-36"
  >X</div>
);

const modal = () => (
  <div className="modal-root">
    <div className="custom-modal-container">
      <div className="custom-modal px-5 mx-auto col-lg-5 overflow-y bg-danger">
        <div className="row-fluid">
          <CloseModal />
          <div className="modal-title pb-4">
            <h1 className="font-size-24">Side of One Egg</h1>
          </div>
          <div className="d-flex justify-content-between border-bottom">
            <h4 className="font-size-12">HOW WOULD YOU LIKE YOUR EGGS?</h4>
            <h4 className="font-size-12">REQUIRED</h4>
          </div>
          <form action="">
            <RadioInput />
            <div className="form-group">
              <Input type="radio" name="Over-Easy" id="instruction" />
              <label htmlFor="Over-Easy"> Over Easy </label>
            </div>
            <div className="form-group">
              <Input type="radio" name="Over-medium" id="instruction" />
              <label htmlFor="Over-medium"> Over Medium </label>
            </div>
            <div className="form-group">
              <Input type="radio" name="Scrambled" id="instruction" />
              <label htmlFor="Scrambled"> Scrambled </label>
            </div>
            <div className="form-group">
              <Input type="radio" name="Over-Hard" id="instruction" />
              <label htmlFor="Over-Hard"> Over Hard </label>
            </div>
            <div className="form-group">
              <Input type="radio" name="Sunny-Side-Up" id="instruction" />
              <label htmlFor="Sunny-Side-Up"> Sunny Side Up </label>
            </div>
            <div className="form-group">
              <Input type="radio" name="" id="instruction" />
              <label htmlFor="Poached"> Poached </label>
            </div>
            <div className="col">
              <label htmlFor="instruction">Special Instruction</label>
              <textarea placeholder="Add Instructions..." name="" id="" cols="30" rows="10" />
            </div>
          </form>

          <ModalFooter />

        </div>
      </div>

    </div>
  </div>

);

export default modal;
