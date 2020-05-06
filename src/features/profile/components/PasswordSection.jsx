import React from 'react';

import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';

import './passwordSection.scss';

const PasswordSection = React.forwardRef(({
  status,
  handleSave,
  handleChange,
  handleEdit,
}, ref) => (
  <div className="account-details">
    <AccountDetailsGroupHeader text="Change Password" />
    <AccountDetailsSection
      placeHolder="Up-to-Date"
      name="password"
      ref={ref}
      handleEdit={handleEdit}
      handleSave={handleSave}
      handleChange={handleChange}
      status={status}
    />
  </div>
));

export default PasswordSection;
