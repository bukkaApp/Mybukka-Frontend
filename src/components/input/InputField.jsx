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
}) => (
  <input
    type={type}
    name={name}
    className={classNames}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={handleFocus}
  />
);

export default InputField;

InputField.defaultProps = {
  type: 'text',
  classNames: 'default-btn'
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  placeholderText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired
};
