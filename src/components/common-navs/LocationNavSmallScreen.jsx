import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import DismissModal from '../modal/DismissModal';
import Modal from '../modal';
import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import DeliveryOrPickupNav from './DeliveryOrPickupNav';
import ChevronRight from '../icons/ChevronRight';

import './LocationNavSmallScreen.scss';

const SelectLocationModal = () => (
  <Modal classNames="select-delivery-pickup">
    <div className="small-search-container">
      <DismissModal classNames="dismiss-modal-right" />
      <div className="small-search-wrapper">
        <div className="dropdown-suggestion">
          <Fragment>
            <DeliveryOrPickupNav />
            <SuggestionsDropdown handleClick={() => {}} />
          </Fragment>
        </div>
      </div>
    </div>
  </Modal>
);

const SuggestionsDropdown = () => (
  <div className="suggestion-dropdown">
    <SearchLocation
      chevronButtonVisible={false}
      showDeliveryOrPickupNav={false}
    />
  </div>
);

const ButtonText = () => (
  <h2 className="inline-text">
    <span>Delivery to</span>
    <span className="text">
      MaryLand
      <span className="chevron-down">
        <ChevronRight />
      </span>
    </span>
  </h2>
);

const CurrentLocation = ({ handleClick }) => (
  <Button type="button" classNames="small-nav-btn" handleClick={handleClick}>
    <ButtonText />
  </Button>
);

const SmallLocationNav = () => (
  <div className="options-container">
    <div className="options-center col-lg-10">
      <div className="options-wrapper">
        <div className="options">
          <div className="btn-location">
            <div data-target="#modal" data-toggle="modal">
              <CurrentLocation handleClick={() => {}} />
            </div>
            <SelectLocationModal />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SmallLocationNav;

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired
};
