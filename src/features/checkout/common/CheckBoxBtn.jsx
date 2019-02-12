import React, { useState } from 'react';
import Input from 'Components/input/InputField';
import './button.scss';

const CheckBox = () => {
  const [isChecked, setChecked] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setChecked(!isChecked);
  };
  return (
    <div
      className="onfocus text-center"
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={handleClick}
    >
      <label
        className="checkbox-container"
        htmlFor="makeAsDefault"
      >
        Make default payment method
        <Input
          type="checkbox"
          handleChange={() => {}}
          handleClick={() => {}}
          handleFocus={() => {}}
          inputElement={{ checked: isChecked }}
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
export default CheckBox;
