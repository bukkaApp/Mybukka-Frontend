import React from 'react';

import PropTypes from 'prop-types';
import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';

import './passwordSection.scss';

const PasswordSection = ({
  status,
  handleSave,
  handleChange,
  handleEdit,
  inputRef
}) => (
  <div className="account-details">
    <AccountDetailsGroupHeader text="Change Password" />
    <AccountDetailsSection
      placeHolder="Up-to-Date"
      name="password"
      inputRef={inputRef}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleChange={handleChange}
      status={status}
    />
  </div>
);

export default PasswordSection;

PasswordSection.defaultProps = {
  handleSave: () => {},
  handleChange: () => {},
  handleEdit: () => {},
  inputRef: () => {}
};

PasswordSection.propTypes = {
  status: PropTypes.string.isRequired,
  handleSave: PropTypes.func,
  handleChange: PropTypes.func,
  handleEdit: PropTypes.func,
  inputRef: PropTypes.func,
};
