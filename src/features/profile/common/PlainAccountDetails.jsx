import React from 'react';

import PropTypes from 'prop-types';

import EditTogglerButton from './EditTogglerButton';

import './inputAccountDetails.scss';

const plainAccountDetails = ({
  text,
  altText,
  children,
  handleEdit,
}) => (
  <div className="input-acc-details-section">
    <div className="form-acc-details">
      <div className="form-group input-acc-details">
        {children || (
          <p
            className="input-acc-details"
          >
            {text || altText}
          </p>
        )}
      </div>
      <EditTogglerButton handleClick={handleEdit} text="EDIT" />
    </div>
  </div>
);

export default plainAccountDetails;

plainAccountDetails.defaultProps = {
  children: '',
  altText: '',
  handleEdit: () => {},
};

plainAccountDetails.propTypes = {
  text: PropTypes.string.isRequired,
  altText: PropTypes.string,
  children: PropTypes.node,
  handleEdit: PropTypes.func
};
