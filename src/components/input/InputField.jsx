import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

const InputField = React.forwardRef(({
  type,
  name,
  classNames,
  placeholderText,
  handleChange,
  handleFocus,
  accept,
  autoComplete,
  checked,
  value,
}, ref) => (
  <input
    type={type}
    name={name}
    ref={ref}
    accept={accept}
    className={classNames}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={handleFocus}
    value={value}
    autoComplete={autoComplete}
    checked={checked}
  />
));

export default InputField;

InputField.defaultProps = {
  type: 'text',
  classNames: 'default-input',
  placeholderText: '',
  handleFocus: () => {},
  ref: React.createRef(),
  accept: '',
  autoComplete: 'off',
  checked: false,
  value: ''
};

InputField.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  accept: PropTypes.string,
  checked: PropTypes.bool,
};
