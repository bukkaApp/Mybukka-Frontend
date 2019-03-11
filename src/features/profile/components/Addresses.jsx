import React from 'react';

import PropTypes from 'prop-types';
import shortId from 'shortid';

import { RoundedPlus } from 'Icons/Plus';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import InputAccountDetails from '../common/InputAccountDetails';
import AddMoreSection from '../common/AddMoreSection';

import AddPaymentForm from '../forms/AddPaymentForm';
import './addresses.scss';

const AddAnAddress = () => (
  <div className="add-address" data-toggle="modal">
    <AddMoreSection dataTarget="#modal" text="add new address">
      <RoundedPlus />
    </AddMoreSection>
  </div>
);

const Addresses = ({ addresses, ...props }) => (
  <div className="addresses-section">
    <AddPaymentForm {...props} type="payment" />
    <AccountDetailsGroupHeader text="Addresses" />
    {addresses.map(address => (
      <InputAccountDetails
        placeHolder="address"
        name="address"
        type="text"
        defaultValue={address}
        key={shortId.generate()}
      />
    ))}
    <AddAnAddress />
  </div>
);

export default Addresses;

Addresses.defaultProps = {
  addresses: []
};

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string)
};
