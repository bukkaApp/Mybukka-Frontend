import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './input.scss';

// Note: add random strings for autocomplete;autocomplete="dontauthocomplete"

const InputField = ({
  type,
  name,
  classNames,
  placeholderText,
  handleChange,
  handleFocus,
  defaultValue,
  inputRef,
  accept,
  autoComplete,
  checked,
  value,
}) => {
  const props = value !== undefined ? { value } : {};
  return (
    <input
      type={type}
      name={name}
      ref={inputRef}
      accept={accept}
      className={classNames}
      placeholder={placeholderText}
      onChange={handleChange}
      onFocus={handleFocus}
      {...props}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      checked={checked}
    />
  );
};
export default InputField;

InputField.defaultProps = {
  type: 'text',
  classNames: 'default-input',
  placeholderText: '',
  handleFocus: () => {},
  defaultValue: '',
  inputRef: () => {},
  accept: '',
  autoComplete: 'off',
  checked: false,
  value: undefined
};

InputField.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  accept: PropTypes.string,
  checked: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};
