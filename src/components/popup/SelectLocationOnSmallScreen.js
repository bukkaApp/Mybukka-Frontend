import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Clock from 'Icons/Clock';
import ChevronVertical from '../icons/ChevronVertical';
import DismissModal from '../modal/DismissModal';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import SearchLocation from '../places-suggest/SearchLocation';
import DeliveryOrPickupNav from '../common-navs/DeliveryOrPickupNav';
import Schedule from '../schedule/Schedule';
import { useModalContext } from '../../context/ModalContext';

import './SelectLocationOnSmallScreen.scss';

import Cancel from '../icons/Cancel';

const CancelScheduleBtn = ({ handleClick }) => (
  <div
    className="dismiss-modal Cancel-Schedule-Button"
    tabIndex="0"
    role="button"
    aria-pressed="false"
    onClick={handleClick}
  >
    <Cancel />
  </div>
);

const SelectLocationOnSmallScreen = ({ delivery, currentSchedule, mode }) => {
  const [schedule, setSchedule] = useState(false);

  const { setModal, selectLocationPopup, setSelectLocationPopup } = useModalContext();

  const onClick = (state) => {
    setSelectLocationPopup(state);
    setModal(state);
  };

  return (
    <Modal
      onClickOut={() => onClick(false)}
      show={selectLocationPopup}
      className="select-delivery-pickup"
    >
      <div className="small-search-container">
        {!schedule && <DismissModal onClick={() => onClick(false)} />}
        {schedule &&
        <CancelScheduleBtn handleClick={() => setSchedule(false)} />}
        <div className="small-search-wrapper">
          <div className="dropdown-suggestion">
            {!schedule &&
            <Fragment>
              <DeliveryOrPickupNav delivery={delivery} />
              <div className="suggestion-dropdown">
                <SearchLocation
                  chevronButtonVisible={false}
                  useCurrentLocationVisible
                  showDeliveryOrPickupNav={false}
                  showDropdown
                  useModal
                  onClick={() => onClick(false)}
                />
              </div>
              <div className="carousel-divider mb-0" />
              <Button type="button" classNames="schedule-later-btn" handleClick={() => setSchedule(true)}>
                <span className="col-10 text-left">
                  <span className="top--1">
                    <Clock />
                  </span>
                  <span className="pl-3 align-bottom">Schedule for Later</span>
                </span>
                <span className="col-2">
                  <ChevronVertical />
                </span>
              </Button>
            </Fragment>}
            {schedule && <Schedule mode={mode} currentSchedule={currentSchedule} />}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectLocationOnSmallScreen;

SelectLocationOnSmallScreen.defaultProps = {
  delivery: false
};

SelectLocationOnSmallScreen.propTypes = {
  delivery: PropTypes.bool
};

CancelScheduleBtn.propTypes = {
  handleClick: PropTypes.func.isRequired
};
