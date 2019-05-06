import React from 'react';

import PropTypes from 'prop-types';

import BukkaNavSmallScreen, { ResponsiveCategories }
  from 'Components/navbar/BukkaNavSmallScreen';
import Footer from 'Components/footer/Footer';
import Navbar from 'Components/navbar';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLarge';
import UnAuthenticatedCheckout
  from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavSmallScreen, { SelectLocationModal }
  from 'Components/common-navs/LocationNavSmallScreen';

import AddToCart from '../addToCart';
import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
import BukkaMeals from './BukkaMeals';

import './bukkaScene.scss';

const BukkaMenuScene = ({ push }) => (
  <div className="bukka-menu">
    <AddToCart />
    <SelectLocationModal />
    <ResponsiveCategories placeholderText="Search Bukka" />
    <Navbar push={push} bukka />
    <BukkaImageSection />
    <LocationNavLargeScreen deliveryorpickup classNames="bukka-location-nav" />
    <LocationNavSmallScreen />
    <div className="carousel-divider mb-0" />
    <BukkaNavSmallScreen classNames="top-0" currentCategory="breakfast" />
    <BukkaDetailsSection />

    <BukkaMeals />
    <Footer />
    <UnAuthenticatedCheckout push={push} />
    {/* <ClosedNotification /> */}
  </div>
);

export default BukkaMenuScene;

BukkaMenuScene.defaultProps = {
  push: () => {}
};

BukkaMenuScene.propTypes = {
  push: PropTypes.func
};
