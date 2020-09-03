import React from 'react';
import PropTypes from 'prop-types';

const UnSelectableHeading = ({ children, text, classNames, font }) => (
  <div className={`unselectable ${classNames}`}>
    <div className={`personalized-header-text text-capitalize ${font}`}>
      {text || children}
    </div>
  </div>
);

export default UnSelectableHeading;

UnSelectableHeading.defaultProps = {
  classNames: '',
  font: '',
  text: '',
  children: <div />
};

UnSelectableHeading.propTypes = {
  text: PropTypes.string,
  classNames: PropTypes.string,
  font: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
    PropTypes.array
  ])
};
