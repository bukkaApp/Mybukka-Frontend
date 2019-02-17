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
}) => (
  <input
    type={type}
    name={name}
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
  classNames: 'default-btn',
  placeholderText: '',
  handleFocus: () => {},
  defaultValue: '',
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
