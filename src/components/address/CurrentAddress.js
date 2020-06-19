import React from 'react';

import { useModalContext } from '../../context/ModalContext';
import GeoSuggestions from '../places-suggest/GeoSuggestions';
import { useFormReportContext } from '../../context/FormReportContext';

import './index.scss';

const CurrentAddress = ({ useProfileStandard }) => {
  const { setAddressFormPopup, setModal, } = useModalContext();
  const { changeAddress: changeDefualtAddress, address, resetAddressReport } = useFormReportContext();

  const emitOnClick = (state) => {
    setModal(state);
    setAddressFormPopup(state);
  };

  return changeDefualtAddress ?
    <GeoSuggestions
      asUtility
      noBorderOnMedium={!useProfileStandard}
      onDoubleClick={() => resetAddressReport()}
      withPrimaryButton
      text="current"
      emitOnClick={() => emitOnClick(true)}
      predictions={[{ terms: address.address.split(', ').map(loc => ({ value: loc })) }]}
    />
    : null;
};

export default CurrentAddress;
