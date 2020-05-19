/* eslint-disable react/prop-types */
import React, { useEffect, Fragment, createRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import Field from 'Components/input/Field';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from './SuggestionsDropdown';

import './searchlocation.scss';
import useAutocompleteService from '../../hooks/useAutocompleteService';

const SearchLocation = ({
  showDeliveryOrPickupNav,
  chevronButtonVisible,
  showDropdown,
}) => {
  const [predictions, setPredictions] = useState([]);
  const wrapperRef = createRef();
  const { push } = useHistory();

  const {
    setFocus,
    hasFocus,
    handleChange,
    handleClick,
    inputData,
  } = useAutocompleteService(setPredictions);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <Field.Input
          type="text"
          name="searchLocation"
          placeholderText="Enter your address..."
          classNames="text-field form-control searchlocation"
          handleChange={handleChange}
          onFocus={() => setFocus(true)}
          // onBlur={() => setFocus(false)}
          value={inputData}
        />
        {showChevronButton()}
      </div>
      {showDropdown && (<div className="carousel-divider mb-0" />)}
      <div className="dropdown-suggestion">
        {(hasFocus || showDropdown) && (
          <Fragment>
            {showDeliveryOrPickupNav ? <DeliveryOrPickupNav /> : null}
            <SuggestionsDropdown
              push={push}
              setLocation={handleClick}
              predictions={predictions}
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
