import React from 'react';

import shortId from 'shortid';
import PropTypes from 'prop-types';

import './buttons.scss';

const Button = ({
  type,
  classNames,
  text,
  handleClick,
  children,
  disabled,
  dataTarget,
  dataToggle,
  id,
}) => (
  <button
    type={type}
    className={classNames}
    onClick={handleClick}
    disabled={disabled}
    data-target={dataTarget}
    data-toggle={dataToggle}
    id={id}
  >
    {text || children}
  </button>
);

export default Button;

Button.defaultProps = {
  text: '',
  dataTarget: '',
  dataToggle: '',
  id: shortId.generate(),
  children: <div />,
  disabled: false
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  disabled: PropTypes.bool,
  dataTarget: PropTypes.string.isRequired,
  dataToggle: PropTypes.string.isRequired,
  id: PropTypes.string,
};
