import React from 'react';
import PropTypes, { any } from 'prop-types';

import './input.scss';

const InputField = ({
  type,
  name,
  classNames,
  placeholderText,
  handleChange,
  handleFocus,
  inputElement
}) => (
  <input
    type={type}
    name={name}
    className={classNames}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={handleFocus}
    {...inputElement}
  />
);

export default InputField;

InputField.defaultProps = {
  type: 'text',
  classNames: 'default-btn',
  placeholderText: '',
  inputElement: ''
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  inputElement: PropTypes.objectOf(any),
  placeholderText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired
};
