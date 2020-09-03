import React from 'react';
import PropTypes from 'prop-types';

const AccountDetailsGroupHeader = ({ text }) => (
  <div className="account-details-header">
    <h5 className="account-details-text">{text}</h5>
  </div>
);

export default AccountDetailsGroupHeader;

AccountDetailsGroupHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
