import React from 'react';

import { RoundedPlus } from 'Icons/Plus';

import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import AddMoreSection from '../common/AddMoreSection';

import { useModalContext } from '../../../context/ModalContext';
import './addresses.scss';
import { useUserContext } from '../../../context/UserContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';
import GeoSuggestions from '../../../components/places-suggest/GeoSuggestions';

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
  console.log('meomroleeeeking addree ...');
  const deleteAddress = async (id) => {
    const result = confirm('Want to delete?');
    if (result) {
      try {
        loading('ADDRESS', true);
        const response = await API.address.delete(id);
        setAddress(response.data.addresses);
        loading('ADDRESS', false);
      } catch (error) {
        setAddress(error.response ? null : addresses);
        loading('ADDRESS', false);
      }
    }
  };

  return (
    <div id="addresses" className="addresses-section">
      <AccountDetailsGroupHeader text="Addresses" />
      {addresses && addresses.addresses.map(({ address, slug, }) => (
        <GeoSuggestions
          asUtility
          handleClick={() => {}}
          withPrimaryButton={addresses.defaultAddress === slug}
          text={addresses.defaultAddress !== slug ? 'DELETE' : 'DEFAULT'}
          emitOnClick={() => (addresses.defaultAddress !== slug ? deleteAddress(slug) : () => {})}
          predictions={[{ terms: address.split(', ').map(loc => ({ value: loc })) }]}
          key={`Plain-Account-Details-DELETE--${slug}`}
        />
      ))}
      <AddAnAddress />
    </div>
  );
};

export default Addresses;

Addresses.defaultProps = {};

Addresses.propTypes = {};
