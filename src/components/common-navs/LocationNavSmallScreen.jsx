import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';

import Button from '../button/Button';
import ChevronRight from '../icons/ChevronRight';
import MapMarker from '../icons/MapMarker';

import './LocationNavSmallScreen.scss';

import { useLocationContext } from '../../context/LocationContext';
import { useModalContext } from '../../context/ModalContext';


const CurrentLocation = ({ handleClick, mode, bukka }) => {
  const { selectedLocation } = useLocationContext();
  const [state, setState] = useState('Current Location');

  useEffect(() => {
    const hasLocation = Object.keys(selectedLocation).length > 0;
    if (hasLocation) {
      const location = selectedLocation.structured_formatting;
      setState(location.secondary_text.split(',')[0]);
    } else setState('Current Location');
  }, [selectedLocation]);

  return (
    <Button
      type="button"
      classNames="small-nav-btn container pl-10"
      handleClick={handleClick}
    >
      {bukka ?
        <h2 className="inline-text">
          {mode === 'delivery' && <span>Delivery to</span>}
          {mode === 'pickup' && <span>PICKUP NEAR</span>}
          <span className="text">
            {state}
            <span className="chevron-down">
              <ChevronRight />
            </span>
          </span>
        </h2>
        : <h2 className="inline-text">
          <span className="bukka-inline-text">
            <span className="chevron-down pr-1">
              <MapMarker />
            </span>
            {state}
          </span>
        </h2>}
    </Button>
  );
};

const LocationNavSmallScreen = ({ mode, bukka }) => {
  const { selectedLocation } = useLocationContext();
  const isMobileScreen = useMediaQuery({ maxWidth: 576 });
  const { setModal, setSelectLocationPopup } = useModalContext();

  const onClick = () => {
    setSelectLocationPopup(true);
    setModal(true);
  };

  return (
    isMobileScreen &&
      <div
        className="gutter-bg-clor"
      >
        <div className="location-navbar-content container">
          <div className="options-center col-lg-12 px-0">
            <div className="options-wrapper">
              <div className="options">
                <div className="btn-location">
                  <div
                    aria-pressed="true"
                    tabIndex="0"
                    role="button"
                    className="small-location-nav"
                    onClick={onClick}
                  >
                    <CurrentLocation
                      mode={mode}
                      bukka={bukka}
                      handleClick={() => {}}
                      selectedLocation={selectedLocation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode }
}) => ({
  mode,
});

export default connect(mapStateToProps)(LocationNavSmallScreen);

LocationNavSmallScreen.defaultProps = {
  bukka: false,
};

LocationNavSmallScreen.propTypes = {
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  bukka: PropTypes.bool.isRequired
};
