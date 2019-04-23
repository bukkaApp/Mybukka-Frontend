import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DismissModal from '../modal/DismissModal';
import Modal from '../modal';
import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import DeliveryOrPickupNav from './DeliveryOrPickupNav';
import ChevronRight from '../icons/ChevronRight';
import MapMarker from '../icons/MapMarker';

import './LocationNavSmallScreen.scss';

export const SelectLocationModal = () => (
  <Modal classNames="select-delivery-pickup" dataTarget="small-location-nav">
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

const ButtonText = ({ mode }) => (
  <h2 className="inline-text">
    {mode === 'delivery' && <span>Delivery to</span>}
    {mode === 'pickup' && <span>PICKUP NEAR</span>}
    <span className="text">
      MaryLand
      <span className="chevron-down">
        <ChevronRight />
      </span>
    </span>
  </h2>
);

const BukkaButtonText = () => (
  <h2 className="inline-text">
    <span className="bukka-inline-text">
      <span className="chevron-down pr-1">
        <MapMarker />
      </span>
      MaryLand
    </span>
  </h2>
);

const CurrentLocation = ({ handleClick, mode, bukka }) => (
  <Button type="button" classNames="small-nav-btn container pl-10" handleClick={handleClick}>
    {!bukka && <ButtonText mode={mode} />}
    {bukka && <BukkaButtonText />}
  </Button>
);

const LocationNavSmallScreen = ({ mode, bukka }) => (
  <Fragment>
    <div className="d-block d-sm-block d-md-none
      d-lg-none d-xl-none gutter-bg-clor"
    >
      <div className="location-navbar-content container">
        <div className="options-center col-lg-10">
          <div className="options-wrapper">
            <div className="options">
              <div className="btn-location">
                <div data-target="#small-location-nav" data-toggle="modal">
                  <CurrentLocation mode={mode} bukka={bukka} handleClick={() => { }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ deliveryModeReducer: { mode } }) => ({
  mode
});

export default connect(
  mapStateToProps
)(LocationNavSmallScreen);

LocationNavSmallScreen.propTypes = {
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool.isRequired,
};

ButtonText.propTypes = {
  mode: PropTypes.string.isRequired
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool.isRequired,
};
