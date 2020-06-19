import React from 'react';

import { RoundedPlus } from 'Icons/Plus';

import Container from '../container/Container';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import useApi from '../../shared/api';
import { useLoadingContext } from '../../context/LoadingContext';
import GeoSuggestions from '../places-suggest/GeoSuggestions';
import TemporaryWrapper from '../ViewWrappers/TemporaryWrapper';
import ButtonPill from '../button-pill/ButtonPill';
import Address from './Address';
import CurrentAddress from './CurrentAddress';
import { useFormReportContext } from '../../context/FormReportContext';

import './index.scss';

const AddAnAddress = () => {
  const { setAddressFormPopup, setModal, setAddressPopup, addressPopup } = useModalContext();

  const handleClick = () => {
    if (!addressPopup) setModal(true);
    setAddressFormPopup(true);

    if (addressPopup) {
      // delay till form popup is ready
      const timeout = setTimeout(() => {
        setAddressPopup(false);
        clearTimeout(timeout);
      }, 300);
    }
  };

  return (
    <div className="add-address">
      <ButtonPill onClick={handleClick} text="add new address">
        <RoundedPlus />
      </ButtonPill>
    </div>
  );
};

const Addresses = ({ useProfileStandard, noPadding, withModal, useModal, }) => {
  const { address: addresses, setAddress } = useUserContext();
  const { addressPopup, setAddressPopup, setModal, } = useModalContext();
  const { changeAddress: changeDefualtAddress, } = useFormReportContext();
  const { API } = useApi();
  const { loading } = useLoadingContext();

  const changeAddress = (state = true) => {
    setModal(state);
    setAddressPopup(state);
  };

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
    const buttonText = changeDefualtAddress ? 'Default' : 'Change';
    if (!useProfileStandard) return buttonText;
    return (addresses.defaultAddress !== slug ? 'DELETE' : 'DEFAULT');
  };

  const emitOnClick = (slug, state) => {
    if (addresses.defaultAddress !== slug) return deleteAddress(slug);
    return useModal ? changeAddress(state) : null;
  };

  const isntDefaultAddress = slug => addresses.defaultAddress !== slug;

  const addressJsx = (addresses && addresses.addresses.map(({ address, slug, }) => (
    !useProfileStandard && isntDefaultAddress(slug) ? null
      : <GeoSuggestions
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

  if (!useProfileStandard) {
    return (
      <TemporaryWrapper.ViewWrapper>
        {(!addresses || !addresses.addresses.length) ?
          <Address withFormSpace withPadding label="Delivery Address" /> :
          <div className={`${noPadding ? '' : 'addresses-section'}`}>
            <TemporaryWrapper.ViewHeading noPadding text="Address" />
            {addressJsx}
            <CurrentAddress useProfileStandard={useProfileStandard} />
          </div>}
      </TemporaryWrapper.ViewWrapper>);
  }

  const profileStandardJsx = (
    <div id="addresses" className={(useProfileStandard && 'addresses-section') || ''}>
      <div className="account-details-header">
        <h5 className="account-details-text">Addresses</h5>
      </div>
      {addressJsx}
      <AddAnAddress />
    </div>
  );

  if (useProfileStandard && !withModal) return profileStandardJsx;

  return (
    <Modal onClickOut={changeAddress} show={addressPopup} bodyClassName="SmallWidth">
      <Container>
        <div className="Address-Form-Header pb-1">
          <div className="text-end">
            <DismissModal onClick={() => changeAddress(false)} />
          </div>
          {profileStandardJsx}
        </div>
      </Container>
    </Modal>
  );
};

export default Addresses;
