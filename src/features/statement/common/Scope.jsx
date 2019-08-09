import React from 'react';
import PropTypes from 'prop-types';

const Scope = ({ text, classNames }) => (
  <h3 className={classNames}>
    {text}
  </h3>
);

export default Scope;

Scope.defaultProps = {
  classNames: ''
};

Scope.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};
