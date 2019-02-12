import React from 'react';
import Input from 'Components/input/InputField';
import CardFooter from './modalCartFooter';

const modal = () => (
  <div className="container d-none">
    <div className="row-fluid">
      <div className="close-modal">X</div>
      <div className="modal-title">
        <h4>Side of One Egg</h4>
      </div>
      <div>
        <h4>HOW WOULD YOU LIKE YOUR EGGS?</h4>
        <h4>REQUIRED</h4>
      </div>
      <form action="">
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

      <CardFooter />

    </div>
  </div>
);

export default modal;
