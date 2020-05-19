import React, { useState } from 'react';
import Field from 'Components/input/Field';
import PropTypes from 'prop-types';
import './button.scss';

const RadioInput = ({ name, labelText }) => {
  const [isChecked, setChecked] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setChecked(!isChecked);
  };

  return (
    <label
      className="radio-container"
      htmlFor="makeAsDefault"
    >
      <span>{labelText}</span>
      <Field.Radio
        type="radio"
        handleChange={handleClick}
        handleClick={() => {}}
        onFocus={() => {}}
        checked={isChecked}
        id="gridCheck"
        value={labelText}
        placeholderText=""
        name={name}
        classNames=""
      />
      <span
        className="checkmark mt-1"
      />
    </label>
  );
};

export default RadioInput;

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired
};
