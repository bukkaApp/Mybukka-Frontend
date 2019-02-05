import React, { Fragment, useState, useEffect } from 'react';
import PropTypes, { any } from 'prop-types';

import Button from '../button/Button';
import SearchLocation from './SearchLocation';
import DeliveryOrPickupNav from './DeliveryOrPickupNav';
import UseCurrentLocation from './UseCurrentLocation';
import GeoSuggestions from './GeoSuggestions';
import Headline from '../Carousel/Headline';
import BukkaCard from '../Carousel/BukkaCard';
import ChevronRight from '../icons/ChevronRight';
import './LocationNavSmallScreen.scss';

const NearByBukka = ({ BukkaData }) => (
  <div className="mt-4 mb-4">
    <Headline title="Salty & Sweet" activeIndex="1" />
    <div className="row pb-4">
      {BukkaData.map(bukka => (<BukkaCard
        image={bukka.image}
        deliveryCost={bukka.deliveryCost}
        deliveryTime={bukka.deliveryTime}
        rating={bukka.rating}
        imageHeight="img-height"
        classNames="col-lg-4 col-md-3 col-sm-12"
      />))}
    </div>
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
  <h2 className="inline-text">
    <span>Delivery to</span>
    <span className="text">MarryLand
      <span className="chevron-down"><ChevronRight /></span>
    </span>
  </h2>
);

const CurrentLocation = ({ handleClick }) => (
  <Button
    type="button"
    classNames="small-nav-btn"
    text={<ButtonText />}
    handleClick={handleClick}
  />
);

const SmallLocationNav = () => {
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

  return (<div ref={setWrapperRef} className="options-container">
    <div className="options-center col-lg-10">
      <div className="options-wrapper">
        <div className="options">
          <div className="btn-location">
            <CurrentLocation handleClick={handleClick} />

            { isFocused && <div className="search-container">
              <div className="search-wrapper">
                <div className="dropdown-suggestion">
                  <Fragment>
                    <DeliveryOrPickupNav />
                    <SuggestionsDropdown />
                  </Fragment>
                </div>

              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SmallLocationNav;

SuggestionsDropdown.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

CurrentLocation.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

NearByBukka.propTypes = {
  BukkaData: PropTypes.objectOf(any).isRequired
};
