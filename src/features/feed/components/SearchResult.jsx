import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import Navbar from 'Components/navbar';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import NotAvailable from 'Components/not-found/NotAvailable';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';
import NearByBukka from './NearByBukka';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

import favorites from '../data/favorites.json';
import bukkaData from '../data/search.json';

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
          <ExploreSection classNames="pt-5">
            <div className="carousel-divider" />
            <Container>
              <NearByBukka
                classNames="col-lg-4 col-md-4 col-sm-12"
                title="“ American ”"
                bukkaData={[...favorites, ...bukkaData]}
                imageHeight="img-height"
              >
                <div className="col-md-3 col-lg-2">
                  <DeliveryOrPickupNav />
                </div>
              </NearByBukka>
            </Container>
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
