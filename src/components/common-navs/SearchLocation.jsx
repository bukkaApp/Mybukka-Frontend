import React, { Fragment } from 'react';

import Magnifier from '../icons/Magnifier';
import InputField from '../input/InputField';

import './searchlocation.scss';

const SearchLocation = () => (
  <Fragment>
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
        handleFocus={() => {}}
        handleChange={() => {}}
      />
    </div>
  </Fragment>
);

export default SearchLocation;
