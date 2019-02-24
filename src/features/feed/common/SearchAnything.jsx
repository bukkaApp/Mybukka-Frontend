import React, { Fragment } from 'react';

import Magnifier from 'Components/icons/Magnifier';
import InputField from 'Components/input/InputField';

import './searchAnything.scss';

const SearchLocation = () => (
  <Fragment>
    <div
      className="input-group address-input-section
      feed-address-input-section d-inline-flex ml-3"
    >
      <div className="input-group-prepends">
        <span className="nav-magnifier">
          <Magnifier />
        </span>
      </div>
      <InputField
        type="text"
        name="search"
        placeholderText="Search for anything..."
        classNames="text-field form-control"
        handleFocus={() => {}}
        handleChange={() => {}}
      />
    </div>
  </Fragment>
);

export default SearchLocation;
