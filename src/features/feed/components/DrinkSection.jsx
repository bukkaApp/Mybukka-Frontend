import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'Components/container/Container';

import UnAuthenticatedCheckout
  from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, { SelectLocationModal }
  from 'Components/common-navs/LocationNavSmallScreen';

import BukkaNavSmallScreen, { ResponsiveCategories }
  from 'Components/navbar/BukkaNavSmallScreen';

import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';

import AddToCart from './AddToCart';
import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import NearByBukka from './NearByBukka';


import { drinkBannerImage } from '../img/imgLinks';

import drinkData from '../data/drinks.json';
import lessWine from '../data/less-wine.json';
import whiteWine from '../data/white-wine.json';
import redWine from '../data/red-wine.json';

const NearByBukkaContainer = ({ ...props }) => (
  <Container classNames="px-0">
    <NearByBukka {...props} />
  </Container>
);

const DrinkSection = ({
  // mode,
  push,
  coordinates,
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  status: { error },
}) => {
  const handleRefFocus = () => {
    // e.scrollIntoView(false);
  };

  useEffect(() => {
    fetchNearbyBukkas(coordinates);
  }, [coordinates]);

  if (nearbyBukkas.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <AddToCart />
      <ResponsiveCategories placeholderText="Search Drink" />
      <SelectLocationModal />
      {nearbyBukkas.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore text="Drinks" bgImage={drinkBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen scheduleTime />
              <BukkaNavSmallScreen currentCategory="Wine Under $20" />
              <LocationNavSmallScreen />
              <div id="flyout-left-container">
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="Beer Under $15"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="Wine Under $20"
                  imageHeight="drinks-img-height"
                  bukkaData={lessWine}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="Beer"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="IMPORTED BEER"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="CIDER"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="Wine"
                  imageHeight="drinks-img-height"
                  bukkaData={redWine}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                  title="White Wine"
                  imageHeight="drinks-img-height"
                  bukkaData={whiteWine}
                  handleRefFocus={handleRefFocus}
                />
              </div>
            </div>
          </ExploreSection>
        </div>
      )}
      <UnAuthenticatedCheckout push={push} />
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  bukkasReducer: { fetchedBukkas, status },
  selectedLocationReducer: { coordinates },
}) => ({
  fetchedBukkas,
  status,
  coordinates,
  mode,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas }
)(DrinkSection);

DrinkSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
