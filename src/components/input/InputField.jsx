import React from 'react';
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
  autoComplete
}) => (
  <input
    type={type}
    name={name}
    ref={inputRef}
    accept={accept}
    className={classNames}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={handleFocus}
    defaultValue={defaultValue}
    autoComplete={autoComplete}
  />
);

export default InputField;

InputField.defaultProps = {
  type: 'text',
  classNames: 'default-input',
  placeholderText: '',
  handleFocus: () => {},
  defaultValue: '',
  inputRef: () => {},
  accept: '',
  autoComplete: '',
};

InputField.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  accept: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};
