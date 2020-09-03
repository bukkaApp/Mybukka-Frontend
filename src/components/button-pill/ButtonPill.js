import React from 'react';

import PropTypes from 'prop-types';

import './ButtonPill.scss';

const ButtonPill = ({ onClick, children, text }) => (
  <div
    className="add-more-section"
    onClick={onClick}
    aria-pressed="false"
    tabIndex="0"
    role="button"
  >
    {children}
    <span className="text-add">{text}</span>
  </div>
);

export default ButtonPill;

ButtonPill.defaultProps = {};

ButtonPill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  text: PropTypes.string.isRequired,
};
