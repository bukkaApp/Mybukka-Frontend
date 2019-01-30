import React, { useState, useEffect, Fragment } from 'react';

import MapMarker from 'Icons/MapMarker';
import ChevronRight from 'Icons/ChevronRight';
import InputField from 'Components/input/InputField';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import SuggestionsDropdown from 'Components/common-navs/SuggestionsDropdown';

import './searchlocation.scss';

const SearchLocation = () => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  return (
    <div ref={setWrapperRef}>
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
          name="search"
          placeholderText="Enter your address..."
          classNames="text-field form-control"
          handleFocus={() => setFocus(true)}
          handleChange={() => {}}
        />
        <div className="input-group-append">
          <span className="input-group-text button-search">
            <ChevronRight />
          </span>
        </div>
      </div>
      <div className="dropdown-suggestion">
        {isFocused && (
          <Fragment>
            <DeliveryOrPickupNav />
            <SuggestionsDropdown />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;
