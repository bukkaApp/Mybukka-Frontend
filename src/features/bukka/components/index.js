import React from 'react';

import PropTypes from 'prop-types';

import BukkaNavSmallScreen from 'Components/navbar/BukkaNavSmallScreen';
import Footer from 'Components/footer/Footer';
import Navbar from 'Components/navbar';

import LocationNavLargeScreen from
  'Components/common-navs/LocationNavLargeScreen';

import AddToCart from '../addToCart';
import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
import BukkaMeals from './BukkaMeals';

import './bukkaScene.scss';

const BukkaMenuScene = ({ push }) => (
  <div className="bukka-menu">
    <AddToCart />
    <Navbar push={push} />
    <BukkaImageSection />
    <div className="d-none sticky-nav-bar d-md-flex">
      <LocationNavLargeScreen bukka />
    </div>
    <BukkaNavSmallScreen currentCategory="breakfast" />
    <BukkaDetailsSection />
    <BukkaMeals />
    <Footer />
  </div>
);

export default BukkaMenuScene;

BukkaMenuScene.defaultProps = {
  push: () => {}
};

BukkaMenuScene.propTypes = {
  push: PropTypes.func
};
