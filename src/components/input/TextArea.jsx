import React from 'react';

import PropTypes from 'prop-types';

import './textArea.scss';

const TextArea = ({
  name,
  classNames,
  placeholderText,
  handleChange,
  onFocus,
  maxLength
}) => (
  <textarea
    name={name}
    className={`text-area ${classNames}`}
    placeholder={placeholderText}
    onChange={handleChange}
    onFocus={onFocus}
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
  onFocus: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};
