import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ text, children, classNames }) => (
  <p className={classNames}>
    {text || children}
  </p>
);

export default Paragraph;

Paragraph.defaultProps = {
  text: '',
  classNames: '',
  children: <div />
};

Paragraph.propTypes = {
  text: PropTypes.string,
  classNames: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
    PropTypes.array
  ])
};
