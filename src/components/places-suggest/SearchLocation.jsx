/* eslint-disable react/prop-types */
import React, { useEffect, Fragment, createRef } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import showLoadingAction from 'Redux/showLoadingAction';
import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import InputField from 'Components/input/InputField';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from './SuggestionsDropdown';

import './searchlocation.scss';
import useLocationService from '../../context/useLocationService';

const SearchLocation = ({
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
}) => {
  const wrapperRef = createRef();
  const { push } = useHistory();

  const {
    setFocus,
    isFocused,
    handleChange,
    handleClick,
    geoCodeLocation,
    inputData
  } = useLocationService();

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFocus(false);
    }
  };

  const handleChevronClick = () => {
    handleClick();
  };

  const showChevronButton = () => {
    if (chevronButtonVisible) {
      return (
        <div
          onClick={handleChevronClick}
          aria-pressed="false"
          tabIndex="0"
          role="button"
          className="input-group-append button-go-feed"
        >
          <span className="input-group-text button-search">
            <ChevronRight />
          </span>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div ref={wrapperRef}>
      <div
        className="input-group address-input-section"
        style={{ border: '1 px solid #eceff1' }}
      >
        <div className="input-group-prepend">
          <span className="input-group-text location-marker">
            <MapMarker />
          </span>
        </div>
        <InputField
          type="text"
          name="searchLocation"
          placeholderText="Enter your address..."
          classNames="text-field form-control searchlocation"
          handleFocus={() => setFocus(true)}
          handleChange={handleChange}
          value={inputData}
        />
        {showChevronButton()}
      </div>
      {showDropdown && (<div className="carousel-divider mb-0" />)}
      <div className="dropdown-suggestion">
        {(isFocused || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              push={push}
              setLocation={geoCodeLocation}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;

SearchLocation.defaultProps = {
  chevronButtonVisible: true,
  showDeliveryOrPickupNav: true,
  showDropdown: false,
};

SearchLocation.propTypes = {
  showDropdown: PropTypes.bool,
  chevronButtonVisible: PropTypes.bool,
  showDeliveryOrPickupNav: PropTypes.bool,
};
