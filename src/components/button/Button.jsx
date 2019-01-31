import React from 'react';
import PropTypes from 'prop-types';

import './buttons.scss';

const Button = ({
  type,
  classNames,
  text,
  handleClick,
  children,
  disabled
}) => (
  <button
    type={type}
    className={classNames}
    onClick={handleClick}
    disabled={disabled}
  >
    {text || children}
  </button>
);

export default Button;

Button.defaultProps = {
  text: '',
  children: <div />,
  disabled: false
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
