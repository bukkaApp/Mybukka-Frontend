import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';
import ChevronRight from '../icons/ChevronRight';
import './LocationNavSmallScreen.scss';

const DeliveryOrPickupNav = () => (
  <div className="options-content">
    <h2 className="options-h2"><span>Delivery</span></h2>
    <span className="options-center">or</span>
    <h2 className="options-h2"><span>Pickup</span></h2>
    <div className="border-bottom" />
  </div>
);

const SuggestionsDropdown = ({ handleClick }) => (
  <div className="suggestion-dropdown">
    <SearchLocation />
    <UseCurrentLocation
      handleClick={handleClick}
    />
    <GeoSuggestions
      handleClick={handleClick}
      suggestions={[
        { location: 'Mende Maryland, Lagos', key: '1' },
        { location: 'Mende Maryland, Lagos', key: '2' },
        { location: 'Mende Maryland, Lagos', key: '3' },
      ]}
    />
  </div>
);


const ButtonText = () => (
  <Fragment>
    <span>Delivery</span> to
    <h2 className="inline-text"> MarryLand</h2>
    <span className="ChevronDown"><ChevronRight /></span>
  </Fragment>
);

const CurrentLocation = ({ handleClick }) => (
  <Button
    type="button"
    classNames="btn outline-none"
    text={<ButtonText />}
    handleClick={handleClick}
  />
);

const LargeLocationNav = () => {
  let wrapperRef;
  const [isFocused, setFocus] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFocus(!isFocused);
  };

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

  return (<div ref={setWrapperRef} className="options-container d-sm-none">
    <div className="options-center col-lg-10">
      <div className="options-wrapper">
        <div className="options">
          <DeliveryOrPickupNav />

          <div title="vertical" className="divide" />
          <div className="btn-location">
            <CurrentLocation handleClick={handleClick} />

            { isFocused && <div className="search-container">
              <div className="search-wrapper">
                <SuggestionsDropdown handleClick={() => {}} />

              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LargeLocationNav;

SuggestionsDropdown.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
