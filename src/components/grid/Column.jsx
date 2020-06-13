import React from 'react';

import PropTypes from 'prop-types';

const Column = ({ classNames, children, ...prop }) => (
  <div className={`col ${classNames}`} {...prop}>{children}</div>
);

export default Column;

Column.defaultProps = {
  classNames: '',
};

Column.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
