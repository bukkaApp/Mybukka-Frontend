import React from 'react';
import PropTypes from 'prop-types';

import './buttons.scss';

const Button = ({ type, classNames, text, handleClick, children }) => (
  <button type={type} className={classNames} onClick={handleClick}>
    {text || children}
  </button>
);

export default Button;

Button.defaultProps = {
  text: null,
  children: <div />
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
