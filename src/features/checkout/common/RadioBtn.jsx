import React from 'react';
import Input from 'Components/input/InputField';
import './button.scss';

const radioBtn = () => (
  <div className="radio-form">
    <Input
      classNames="radio"
      type="radio"
      id="gridCheck"
    />
    <label className="form-check-label" htmlFor="gridCheck">
        Make default payment method
    </label>
  </div>
);

export default radioBtn;
