import React from 'react';

import { useModalContext } from '../../context/ModalContext';
import GeoSuggestions from '../places-suggest/GeoSuggestions';
import { useFormReportContext } from '../../context/FormReportContext';

import './index.scss';

const CurrentAddress = ({ useProfileStandard }) => {
  const { setAddressFormPopup, setModal, } = useModalContext();
  const { address, resetAddressReport, setAddressReport } = useFormReportContext();

  const emitOnClick = (state) => {
    setAddressReport({ change: true });
    setModal(state);
    setAddressFormPopup(state);
  };

  return address ?
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
