import React from 'react';

import PropTypes from 'prop-types';

import Footer from 'Components/footer/Footer';
import Navbar from 'Components/navbar';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLarge';
import UnAuthenticatedCheckout
  from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavSmallScreen
  from 'Components/common-navs/LocationNavSmallScreen';

import BukkaNavSmallScreen
  from 'Components/navbar/BukkaNavSmallScreen';
import AddToCart from '../addToCart';
import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
import BukkaMeals from './BukkaMeals';

import { bukkaMeals } from './mealData.json';

import './bukkaScene.scss';

const BukkaMenuScene = ({ push }) => (
  <div className="bukka-menu">
    <AddToCart />
    <Navbar push={push} bukka />
    <BukkaImageSection imageUrl="https://res.cloudinary.com/dn93xk5ni/image/upload/v1549932720/bake-baked-basil-236798_vvo5pq.jpg" />
    <LocationNavLargeScreen deliveryorpickup classNames="bukka-location-nav" />
    <LocationNavSmallScreen />
    <div className="carousel-divider mb-0" />
    <BukkaDetailsSection bukkaName="Chipottle Fresh Bukka" />
    <div className="pb-1 d-block d-sm-block d-md-none
      d-lg-none d-xl-none"
    >
      <BukkaNavSmallScreen currentCategory="Chippottle" />
    </div>
    <BukkaMeals mealsData={bukkaMeals} />
    <Footer />
    <UnAuthenticatedCheckout push={push} />
  </div>
);

export default BukkaMenuScene;

BukkaMenuScene.defaultProps = {
  push: () => {},
};

BukkaMenuScene.propTypes = {
  push: PropTypes.func,
};
