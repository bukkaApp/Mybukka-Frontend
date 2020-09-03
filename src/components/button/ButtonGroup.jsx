import React from 'react';

import PropTypes from 'prop-types';

const ButtonGroup = ({ children, classNames }) => (
  <div
    className={`btn-toolbar ${classNames}`}
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div className="btn-group mr-2" role="group" aria-label="First group">
      {children}
    </div>
  </div>
);

export default ButtonGroup;

ButtonGroup.defaultProps = {
  classNames: '',
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classNames: PropTypes.string
};
