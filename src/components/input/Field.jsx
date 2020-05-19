import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

const Input = React.forwardRef(({
  type,
  name,
  classNames,
  placeholderText,
  handleChange,
  onFocus,
  accept,
  autoComplete,
  checked,
  value,
  onBlur,
}, ref) => (
  <input
    type={type}
    name={name}
    ref={ref}
    accept={accept}
    className={classNames}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
    autoComplete={autoComplete}
    checked={checked}
  />
));

const Checkbox = ({ onChange, onFocus, onBlur, name, value, placeholder, checked, optional, classNames = 'CheckBox-field' }) => (
  <input
    className={classNames}
    onChange={onChange}
    type="checkbox"
    required={!optional}
    onFocus={onFocus}
    onBlur={onBlur}
    name={name}
    checked={checked}
    value={value}
    placeholder={placeholder}
  />
);

const Radio = ({ onChange, onFocus, onBlur, name, value, placeholder, checked, optional, classNames = 'radio' }) => (
  <input
    className={classNames}
    onChange={onChange}
    type="radio"
    required={!optional}
    onFocus={onFocus}
    onBlur={onBlur}
    name={name}
    checked={checked}
    value={value}
    placeholder={placeholder}
  />
);

export default { Checkbox, Input, Radio };

Input.defaultProps = {
  type: 'text',
  classNames: 'default-input',
  placeholderText: '',
  onFocus: () => {},
  ref: React.createRef(),
  accept: '',
  autoComplete: 'off',
  checked: false,
  value: '',
  onBlur: () => {},
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  accept: PropTypes.string,
  checked: PropTypes.bool,
};
