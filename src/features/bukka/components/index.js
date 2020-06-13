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
  from '../../../components/cart/UnAuthenticatedCheckout';

import LocationNavSmallScreen, {
  SelectLocationModal
} from '../../../components/common-navs/LocationNavSmallScreen';

import BukkaImageSection from './BukkaImageSection';
import BukkaDetailsSection from './BukkaDetailsSection';
// import ClosedNotification from '../notification/ClosedNotification';

import './bukkaScene.scss';

import BukkaMeals from './BukkaMeals';
import { useBusinessContext } from '../../../context/BusinessContext';
import { useSearchContext } from '../../../context/SearchContext';
import useHashLinkUpdate from '../../../hooks/useHashLinkUpdate';
import OtherNearest from './OtherNearest';

const BukkaMenuScene = ({
  push, errorMessage, bukka,
}) => {
  const [searchQuery, setSearchQuery] = useSearchContext();
  const [activeCatelog, setActiveCatelog] = useState('');
  const [uniqueCatelogs, setUniqueCatelogs] = useState([]);
  const { catelogs, business } = useBusinessContext();
  useHashLinkUpdate();

  useEffect(() => {
    if (catelogs) {
      const categories = [...new Set(catelogs.map(catelog => catelog.category))];
      setUniqueCatelogs(categories);
    }
  }, [catelogs]);

  useEffect(() => {
    if (errorMessage !== '') {
      swal({ text: errorMessage, icon: 'warning', dangerMode: true });
    }
  }, [errorMessage]);

  const isInSearch = (catelog) => {
    if (catelog) {
      return catelog.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  };

  const hasNoResult = () => catelogs && catelogs.filter(menu => isInSearch(menu)).length === 0;

  return (
    <div className="bukka-menu">
      {/* <ClosedNotification /> */}
      <SelectLocationModal />
      <Navbar push={push} bukka />
      <BukkaImageSection business={business} />
      <LocationNavLargeScreen
        deliveryorpickup
        classNames="bukka-location-nav"
        categoryItems={uniqueCatelogs}
        activeItem={activeCatelog}
        section={`bukka/${catelogs ? catelogs[0].bukka : ''}`}
        handleSearch={event => setSearchQuery(event.target.value)}
      />
      <LocationNavSmallScreen />
      <div className="carousel-divider mb-0" />
      <BukkaNavSmallScreen
        classNames="top-0"
        uniqueCatelogs={uniqueCatelogs}
        bukkaMenu={catelogs}
        currentCategory={activeCatelog}
        activeCatelog={activeCatelog || 'categories'}
      />
      {!(searchQuery && hasNoResult()) && <BukkaDetailsSection />}
      <BukkaMeals
        isInSearch={isInSearch}
        hasNoResult={hasNoResult}
        searchQuery={searchQuery}
        setActiveCatelog={setActiveCatelog}
        activeCatelog={activeCatelog}
        uniqueCatelogs={uniqueCatelogs}
      />
      <OtherNearest />
      <Footer />
      <UnAuthenticatedCheckout push={push} to={`/merchant/${bukka}/checkout`} />
    </div>
  );
};

const mapStateToProps = ({ cartReducer: { errorMessage }, }) => ({
  errorMessage,
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
