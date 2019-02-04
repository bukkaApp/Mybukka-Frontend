import React, { useState, useEffect } from 'react';

import Magnifier from 'Icons/Magnifier';
import InputField from 'Components/input/InputField';

import './searchlocation.scss';

const SearchLocation = () => {
  let wrapperRef;
  const [setFocus] = useState(false);

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
        <div className="input-group-prepends">
          <span>
            <Magnifier />
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
      </div>
    </div>
  );
};

export default SearchLocation;
