import React, { useState } from 'react';
import Input from 'Components/input/InputField';
import './button.scss';

const RadioInput = () => {
  const [isChecked, setChecked] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setChecked(!isChecked);
  };
  return (
    <div
      className="onfocus py-2"
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={handleClick}
    >
      <label
        className="radio-container text-center"
        htmlFor="makeAsDefault"
      >
        Make default payment method
        <Input
          type="radio"
          handleChange={() => {}}
          handleClick={() => {}}
          handleFocus={() => {}}
          inputElement={{
            checked: isChecked,
            id: 'gridCheck'
          }}
          classNames="check"
          id="makeAsDefault"
        />
        <span
          className="checkmark"
        />
      </label>
    </div>
  );
};

export default RadioInput;
