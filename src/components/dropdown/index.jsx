import React from 'react';

import PropTypes from 'prop-types';

import './dropdown.scss';

const DropDown = ({ children }) => (
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <div className="dropdown-children">{children}</div>
  </div>
);

export default DropDown;

DropDown.propTypes = {
  children: PropTypes.node.isRequired
};
