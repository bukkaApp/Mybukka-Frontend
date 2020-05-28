import React from 'react';

import { RoundedPlus } from 'Icons/Plus';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import PlainAccountDetails from '../common/PlainAccountDetails';
import AddMoreSection from '../common/AddMoreSection';

import { useModalContext } from '../../../context/ModalContext';
import './addresses.scss';
import { useUserContext } from '../../../context/UserContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';

const AddAnAddress = () => {
  const { setAddressPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setAddressPopup(true);
  };

  return (
    <div className="add-address" data-toggle="modal">
      <AddMoreSection onClick={handleClick} text="add new address">
        <RoundedPlus />
      </AddMoreSection>
    </div>
  );
};

const Addresses = () => {
  const { address: addresses, setAddress } = useUserContext();
  const { API } = useApi();
  const { loading } = useLoadingContext();

  const deleteAddress = async (id) => {
    const result = confirm('Want to delete?');
    if (result) {
      try {
        loading('ADDRESS', true);
        await API.address.delete(id);
        const response = await API.address.get();
        setAddress(response.data.addresses || null);
        loading('ADDRESS', false);
      } catch (error) {
        setAddress(error.response ? null : addresses);
        loading('ADDRESS', false);
      }
    }
  };

  return (
    <div className="addresses-section">
      <AccountDetailsGroupHeader text="Addresses" />
      {addresses && addresses.map(address => (
        <PlainAccountDetails
          handleEdit={() => deleteAddress(address._id)}
          btnText="DELETE"
          text={address.address}
          key={`Plain-Account-Details-DELETE-$${address._id}`}
        />
      ))}
      <AddAnAddress />
    </div>
  );
};

export default Addresses;

Addresses.defaultProps = {};

Addresses.propTypes = {};
