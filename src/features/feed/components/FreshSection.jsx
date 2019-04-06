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

import { freshBannerImage } from '../img/imgLinks';

import bukkaData from '../data/fresh.json';
import freshMilk from '../data/fresh-milk.json';
import freshGreen from '../data/fresh-green.json';
import freshVeggies from '../data/fresh-veggies.json';
import freshYogurt from '../data/fresh-yogurt.json';
import freshFruit from '../data/fresh-fruit.json';

const FreshSection = ({
  // mode,
  push,
  coordinates,
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  status: { error }
}) => {
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
            <AreasToExplore text="Groceries" bgImage={freshBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen />
              <LocationNavSmallScreen />
              <div>
                <Container>
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="Customers Love"
                    imageHeight="drinks-img-height"
                    bukkaData={bukkaData}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    // title="Dairy & Eggs"
                    title="MILK" // subTitle
                    imageHeight="drinks-img-height"
                    bukkaData={freshMilk}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="EGGS"
                    subTitle="EGGS"
                    imageHeight="drinks-img-height"
                    bukkaData={bukkaData}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="Fresh Veggies"
                    subTitle="Fresh Veggies"
                    imageHeight="drinks-img-height"
                    bukkaData={freshVeggies}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="YOGURT"
                    subTitle="YOGURT"
                    imageHeight="drinks-img-height"
                    bukkaData={freshYogurt}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="Fresh Greens"
                    subTitle="Fresh Greens"
                    imageHeight="drinks-img-height"
                    bukkaData={freshGreen}
                  />
                  <NearByBukka
                    classNames="col-lg-3 col-md-4 col-sm-6 col-12"
                    title="Fresh Fruit"
                    subTitle="Fresh Fruit"
                    imageHeight="drinks-img-height"
                    bukkaData={freshFruit}
                  />
                </Container>
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
)(FreshSection);

FreshSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
