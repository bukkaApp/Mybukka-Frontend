import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen
  from 'Components/common-navs/LocationNavSmallScreen';

import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';
import BukkasToExploreSection from './BukkasToExploreSection';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import NearByBukka from './NearByBukka';

import { foodBannerImage } from '../img/imgLinks';

import freeDelivery from '../data/free-delivery.json';
import favorites from '../data/favorites.json';

const FoodSection = ({
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
            <AreasToExplore bgImage={foodBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen />
              <LocationNavSmallScreen />
              <div>
                <BukkasToExploreSection />
                <div className="carousel-divider" />
                <Container classNames="pr-15">
                  <NearByBukka
                    classNames="col-lg-4 col-md-4 col-sm-12"
                    title="Nearby"
                    bukkaData={[...favorites, ...freeDelivery]}
                    imageHeight="img-height"
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
)(FoodSection);

FoodSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
