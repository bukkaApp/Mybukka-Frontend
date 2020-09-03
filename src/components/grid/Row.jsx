import React from 'react';

import PropTypes from 'prop-types';

const Row = ({ children, classNames }) => (
  <div className={`row ${classNames}`}>{children}</div>
);

export default Row;

Row.defaultProps = {
  classNames: '',
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classNames: PropTypes.string,
};
