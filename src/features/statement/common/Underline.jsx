import React from 'react';
import PropTypes from 'prop-types';

import './underline.scss';

const Underline = ({ children }) => (
  <span className="text_underline">
    {children}
  </span>
);

export default Underline;

Underline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.array
  ]).isRequired
};
