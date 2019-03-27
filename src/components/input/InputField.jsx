import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';

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
};

InputField.propTypes = {
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
