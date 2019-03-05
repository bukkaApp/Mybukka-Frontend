import React from 'react';

import PropTypes from 'prop-types';

import './textArea.scss';

const TextArea = ({
  name,
  classNames,
  placeholderText,
  handleChange,
  handleFocus,
  maxLength
}) => (
  <textarea
    name={name}
    className={`text-area ${classNames}`}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={handleFocus}
    maxLength={`${maxLength}`}
  />
);

export default TextArea;

TextArea.defaultProps = {
  classNames: '',
  placeholderText: 'Add text...',
  maxLength: 200
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  placeholderText: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};
