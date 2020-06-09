import React from 'react';

import { useHistory } from 'react-router-dom';
import { RoundedPlus } from 'Icons/Plus';

import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import useApi from '../../shared/api';
import { useLoadingContext } from '../../context/LoadingContext';
import GeoSuggestions from '../places-suggest/GeoSuggestions';
import TemporaryWrapper from '../ViewWrappers/TemporaryWrapper';
import ButtonPill from '../button-pill/ButtonPill';
import Address from './Address';

import './index.scss';

const AddAnAddress = () => {
  const { setAddressPopup, setModal } = useModalContext();

  const handleClick = () => {
    setModal(true);
    setAddressPopup(true);
  };

  return (
    <div className="add-address" data-toggle="modal">
      <ButtonPill onClick={handleClick} text="add new address">
        <RoundedPlus />
      </ButtonPill>
    </div>
  );
};

const Addresses = ({ useProfileStandard, noPadding }) => {
  const { address: addresses, setAddress } = useUserContext();
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { push } = useHistory();

  const changeAddress = () => push('/profile#addresses');

  const deleteAddress = async (id) => {
    const result = confirm('Want to delete?');
    if (!result) return;
    try {
      loading(true);
      const response = await API.address.delete(id);
      setAddress(response.data.addresses);
      loading(false);
    } catch (error) {
      setAddress(error.response ? null : addresses);
      loading(false);
    }
  };

  const decodeButtonText = (slug) => {
    if (!useProfileStandard) return 'Change';
    return (addresses.defaultAddress !== slug ? 'DELETE' : 'DEFAULT');
  };

  const emitOnClick = (slug) => {
    if (addresses.defaultAddress !== slug) return deleteAddress(slug);
    return changeAddress();
  };

  // const isntDefaultAddress = slug => addresses.defaultAddress !== slug;

  const addressJsx = (addresses && addresses.addresses.map(({ address, slug, }) => (
    // !useProfileStandard && isntDefaultAddress(slug) ? null :
    <GeoSuggestions
      asUtility
      noBorderOnMedium={!useProfileStandard}
      handleClick={() => {}}
      withPrimaryButton={addresses.defaultAddress === slug}
      text={decodeButtonText(slug)}
      emitOnClick={() => emitOnClick(slug)}
      predictions={[{ terms: address.split(', ').map(loc => ({ value: loc })) }]}
      key={`Plain-Account-Details-DELETE--${slug}`}
    />
  )));

  if (useProfileStandard) {
    return (
      <div id="addresses" className={(useProfileStandard && 'addresses-section') || ''}>
        <div className="account-details-header">
          <h5 className="account-details-text">Addresses</h5>
        </div>
        {addressJsx}
        <AddAnAddress />
      </div>
    );
  }

  return (
    <TemporaryWrapper.ViewWrapper>
      {(!addresses || !addresses.addresses.length) ?
        <Address withFormSpace withPadding label="Delivery Address" /> :
        <div className={`${noPadding ? '' : 'addresses-section'}`}>
          <TemporaryWrapper.ViewHeading noPadding text="Address" />
          {addressJsx}
        </div>}
    </TemporaryWrapper.ViewWrapper>);
};

export default Addresses;

Addresses.defaultProps = {};

Addresses.propTypes = {};
