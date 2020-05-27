import React from 'react';

import PropTypes from 'prop-types';

import EditTogglerButton from './EditTogglerButton';

import './inputAccountDetails.scss';

const PlainAccountDetails = ({
  text,
  altText,
  children,
  handleEdit,
  btnText,
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
      <EditTogglerButton handleClick={handleEdit} text={btnText} />
    </div>
  </div>
);

export default PlainAccountDetails;

PlainAccountDetails.defaultProps = {
  btnText: 'EDIT',
  children: '',
  altText: '',
  handleEdit: () => {},
};

PlainAccountDetails.propTypes = {
  btnText: PropTypes.string.isRequired,
  altText: PropTypes.string,
  children: PropTypes.node,
  handleEdit: PropTypes.func
};
