import React from 'react';

import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';

import './passwordSection.scss';

const PasswordSection = ({ handleSave, handleChange, value, errorMessage }) => (
  <div className="account-details">
    <AccountDetailsGroupHeader text="Change Password" />
    <AccountDetailsSection
      placeHolder="Up-to-Date"
      value={value}
      name="password"
      errorMessage={errorMessage}
      handleSave={handleSave}
      handleChange={handleChange}
    />
  </div>
);

export default PasswordSection;
