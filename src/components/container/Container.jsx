import React from 'react';

import PropTypes from 'prop-types';
import './container.scss';

const Container = ({ classNames, children }) => (
  <div className={`container ${classNames}`}>{children}</div>
);

export default Container;

Container.defaultProps = {
  classNames: '',
};

Container.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
