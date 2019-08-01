import React from 'react';
import PropTypes from 'prop-types';

const LastUpdated = ({ text, classNames }) => (
  <div className={`unselectable personalized-header ${classNames}`}>
    {text}
  </div>
);

export default LastUpdated;

LastUpdated.defaultProps = {
  classNames: ''
};

LastUpdated.propTypes = {
  text: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};
