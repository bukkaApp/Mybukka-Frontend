import React from 'react';

import InputAccountDetails from '../common/InputAccountDetails';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from './Addresses';
import Payment from './Payment';

import './accountDetails.scss';

const AccountDetails = () => (
  <div className="account-details">
    <AccountDetailsGroupHeader text="Account Details" />
    <InputAccountDetails placeHolder="First name" name="firstName" />
    <InputAccountDetails placeHolder="Last name" name="lastName" />
    <InputAccountDetails placeHolder="Email" name="email" type="email" />
    <InputAccountDetails
      placeHolder="Contact Mobile"
      name="contactMobile"
      type="number"
    />
    <Addresses addresses={['1, Aminu street, Mende']} />
    <Payment />
  </div>
);

export default AccountDetails;
