import React from 'react';
import SmallSpinner from 'Components/spinners/SmallSpinner';
import LocationArrow from '../icons/LocationArrow';

import { useLocationContext } from '../../context/LocationContext';
import './usecurrentlocation.scss';
import { useModalContext } from '../../context/ModalContext';

const UseCurrentLocation = ({ useModal }) => {
  const { setCurrentLocation, loading, setUpdate } = useLocationContext();
  const { setModal, setSelectLocationPopup } = useModalContext();

  const onClick = () => {
    setUpdate(true);
    setCurrentLocation();
    if (useModal) {
      setSelectLocationPopup(false);
      setModal(false);
    }
  };

  return (
    <div
      className="suggestion-geo-group input-group"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <div className="input-group-prepend">
        <span className="input-group-text location-arrow spinner-loading">
          {loading ? <SmallSpinner /> : <LocationArrow />}
        </span>
      </div>
      <h4 className="suggestion text-center d-block">Use current location</h4>
    </div>
  );
};

export default UseCurrentLocation;

UseCurrentLocation.propTypes = {};
