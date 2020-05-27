import React from 'react';

import PropTypes from 'prop-types';

import './addMoreSection.scss';

const AddMoreSection = ({ onClick, children, text, dataTarget }) => (
  <div
    className="add-more-section"
    data-target={dataTarget}
    onClick={onClick}
    aria-pressed="false"
    tabIndex="0"
    role="button"
    data-toggle="modal"
  >
    {children}
    <span className="text-add">{text}</span>
  </div>
);

export default AddMoreSection;

AddMoreSection.defaultProps = {
  dataTarget: ''
};

AddMoreSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  text: PropTypes.string.isRequired,
  dataTarget: PropTypes.string
};
