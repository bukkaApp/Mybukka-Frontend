import React from 'react';
import PrimaryNavbar from 'Components/navbar/PrimaryNavbar';
import SearchLocation from '../common/SearchLocation';

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
    <h5 className="text-center small-text">
      Food, drinks and groceries available for delivery or pickup.
    </h5>
  </div>
);

const SearchLocationSection = () => (
  <div className="container search-location-section">
    <SearchLocation />
  </div>
);

const IntroSection = () => (
  <div className="intro-section">
    <PrimaryNavbar />
    <LargeTextSection />
    <SmallTextSection />
    <SearchLocationSection />
  </div>
);

export default IntroSection;
