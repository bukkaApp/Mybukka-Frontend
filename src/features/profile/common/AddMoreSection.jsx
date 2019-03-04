import React from 'react';

import PropTypes from 'prop-types';

import './addMoreSection.scss';

const AddMoreSection = ({ children, text, dataTarget }) => (
  <div
    className="add-more-section"
    data-target={dataTarget}
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
