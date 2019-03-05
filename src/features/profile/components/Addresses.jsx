import React from 'react';

import PropTypes from 'prop-types';
import shortId from 'shortid';

import { RoundedPlus } from 'Icons/Plus';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import InputAccountDetails from '../common/InputAccountDetails';
import AddMoreSection from '../common/AddMoreSection';

import './addresses.scss';

const AddAnAddress = () => (
  <div className="add-address" data-toggle="modal" data-target="#modal">
    <AddMoreSection text="add new address"><RoundedPlus /></AddMoreSection>
  </div>
);

const Addresses = ({ addresses }) => (
  <div className="addresses-section">
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
