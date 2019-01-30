import React from 'react';
import PropTypes from 'prop-types';

import './buttons.scss';

const Button = ({ type, classNames, text, handleClick }) => (
  <button type={type} className={classNames} onClick={handleClick}>
    {text}
  </button>
);

export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
