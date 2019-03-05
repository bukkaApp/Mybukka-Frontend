import React, { useState } from 'react';
import Input from 'Components/input/InputField';
import PropTypes from 'prop-types';
import './button.scss';

const RadioInput = ({ name, labelText }) => {
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
        className="radio-container"
        htmlFor="makeAsDefault"
      >
        <span>{labelText}</span>
        <Input
          type="radio"
          handleChange={() => {}}
          handleClick={() => {}}
          handleFocus={() => {}}
          inputElement={{
            checked: isChecked,
            id: 'gridCheck',
            value: labelText
          }}
          placeholderText=""
          name={name}
          classNames=""
        />
        <span
          className="checkmark mt-1"
        />
      </label>
    </div>
  );
};

export default RadioInput;

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired
};
