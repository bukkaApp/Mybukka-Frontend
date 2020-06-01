import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import swal from 'sweetalert';
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

import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
// import ClosedNotification from '../notification/ClosedNotification';

import './bukkaScene.scss';

import BukkaMeals from './BukkaMeals';

const BukkaMenuScene = ({
  push, errorMessage, categories, bukka, bukkaMenu
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorMessage !== '') return swal({ text: errorMessage, icon: 'warning', dangerMode: true });
  }, [errorMessage]);

  const isInSearch = item => item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());

  const hasNoResult = () => bukkaMenu.filter(menu => isInSearch(menu)).length === 0;

  return (
    <div className="bukka-menu">
      {/* <ClosedNotification /> */}
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
      {!hasNoResult() && <BukkaDetailsSection />}

      <BukkaMeals isInSearch={isInSearch} hasNoResult={hasNoResult} searchQuery={searchQuery} />
      <Footer />
      <UnAuthenticatedCheckout push={push} to={`/merchant/${bukka}/checkout`} />
    </div>
  );
};

const mapStateToProps = ({ cartReducer: { errorMessage }, productsReducer: {
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
