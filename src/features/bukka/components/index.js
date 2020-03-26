import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import BukkaNavSmallScreen
  from 'Components/navbar/BukkaNavSmallScreen';
import Footer from 'Components/footer/Footer';
import Navbar from 'Components/navbar';

import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import UnAuthenticatedCheckout
  from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavSmallScreen, {
  SelectLocationModal
} from 'Components/common-navs/LocationNavSmallScreen';

import AddToCart from 'Components/common/addToCart';
import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
import BukkaMeals from './BukkaMeals';
import ClosedNotification from '../notification/ClosedNotification';

import './bukkaScene.scss';

const BukkaMenuScene = ({
  push, errorMessage, categories, bukka, bukkaMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    if (errorMessage !== '') return toastr.error(errorMessage);
  });

  return (
    <div className="bukka-menu">
      <ClosedNotification />
      <AddToCart />
      <SelectLocationModal />
      <Navbar push={push} bukka />
      <BukkaImageSection />
      <LocationNavLargeScreen
        deliveryorpickup
        classNames="bukka-location-nav"
        categoryItems={categories}
        section={`bukka/${bukka}`}
        handleSearch={event => setSearchQuery(event.target.value)}
      />
      <LocationNavSmallScreen />
      <div className="carousel-divider mb-0" />
      <BukkaNavSmallScreen
        classNames="top-0"
        categoryItems={categories}
        bukkaMenu={bukkaMenu}
        currentCategory="breakfast"
      />
      <BukkaDetailsSection />

      <BukkaMeals searchQuery={searchQuery} />
      <Footer />
      <UnAuthenticatedCheckout push={push} to={`/merchant/${bukka}/checkout`} />
    </div>
  );
};

const mapStateToProps = ({ cartReducer: { errorMessage }, fetchBukkaMenuReducer: {
  categories,
  bukkaMenu,
}, }) => ({
  errorMessage,
  categories,
  bukkaMenu,
  bukka: bukkaMenu[0].bukka
});

export default connect(
  mapStateToProps,
  null
)(BukkaMenuScene);

BukkaMenuScene.defaultProps = {
  push: () => {}
};

BukkaMenuScene.propTypes = {
  push: PropTypes.func
};
