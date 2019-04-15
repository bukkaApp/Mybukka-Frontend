import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen
  from 'Components/common-navs/LocationNavSmallScreen';

import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';
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
  <Container>
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
      {nearbyBukkas.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore text="Drinks" bgImage={drinkBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen />
              <LocationNavSmallScreen />
              <div id="flyout-left-container">
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="Beer Under $15"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="Wine Under $20"
                  imageHeight="drinks-img-height"
                  bukkaData={lessWine}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="Beer"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="IMPORTED BEER"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="CIDER"
                  imageHeight="drinks-img-height"
                  bukkaData={drinkData}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                  title="Wine"
                  imageHeight="drinks-img-height"
                  bukkaData={redWine}
                  handleRefFocus={handleRefFocus}
                />
                <div className="carousel-divider" />
                <NearByBukkaContainer
                  classNames="col-lg-3 col-md-4 col-sm-6 col-12"
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
