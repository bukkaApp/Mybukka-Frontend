import React from 'react';

import PropTypes from 'prop-types';

import PrimaryNavbar from 'Components/navbar';
import SearchLocation from 'Components/places-suggest/SearchLocation';

import './introsection.scss';

const LargeTextSection = () => (
  <div className="container large-text-section">
    <h2 className="text-center larger-text">
      Anything, anytime, anywhere. We get it.
    </h2>
  </div>
);

const SmallTextSection = () => (
  <div className="container small-text-section">
    <h5 className="text-center sub-text">
      Food, mart and groceries available for delivery or pickup.
    </h5>
  </div>
);

const SearchLocationSection = () => (
  <div className="container search-location-section">
    <SearchLocation />
  </div>
);

const IntroSection = ({ push }) => (
  <div className="intro-section">
    <PrimaryNavbar push={push} authButton />
    <LargeTextSection />
    <SmallTextSection />
    <div className="col-12 px-0 col-sm-9 col-md-10 col-lg-5 max-search-location mx-auto">
      <SearchLocationSection push={push} />
    </div>
  </div>
);

export default IntroSection;

IntroSection.propTypes = {
  push: PropTypes.func.isRequired,
};

SearchLocationSection.propTypes = {};
