import React from 'react';
import PropTypes from 'prop-types';
// import Paragraph from './Paragraph';

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
  classNames: '',
};
