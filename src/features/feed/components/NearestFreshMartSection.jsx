/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from 'Components/container/Container';

import NoNearByBukkaLocation
  from 'Components/not-found/NoNearByBukkaLocation';
import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';

import Carousel from 'Components/Carousel/Carousel';
import BukkasToExploreSection from './BukkasToExploreSection';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import NearestFreshOrMart from './NearestFreshOrMart';
import Map from '../common/Map';
import { foodBannerImage } from '../img/imgLinks';

import freeDelivery from '../data/free-delivery.json';
import favorites from '../data/favorites.json';
import getPromotedBukkas from '../actionCreators/getPromotedBukkas';


const mapContainerDisplay = displayMap => (
  displayMap
    ? 'px-0 d-flex flex-column flex-xl-row flex-lg-row flex-md-column'
    : 'px-0'
);

const mapContentDisplay = displayMap => (
  displayMap
    ? 'nearby-bukka col-xl-4 px-0 d-lg-flex d-md-none d-none'
    : 'mb-5'
);

const mapDisplay = displayMap => (
  displayMap
    ? 'container map-wrapper col-xl-8 col-lg-8 col-md-12col-12 order-first order-lg-0'
    : 'd-none'
);

const NearestFreshMartSection = ({
  mode,
  push,
  coordinates,
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  currentPage,
  errorMessage,
  loading,
  fetchedPromotedBukkas,
  fetchedCuisines,
}) => {
  const [displayMap, setDisplayMap] = useState(false);

  const handleClick = () => {
    setDisplayMap(!displayMap);
  };

  const handleFetchOnRefresh = () => {
    if (!loading && nearbyBukkas.length === 0
      && coordinates.length !== 0 && !errorMessage) {
      fetchNearbyBukkas(coordinates);
    }
  };

  useEffect(() => {
    if (coordinates.length < 2) {
      push('/');
    }
  }, [coordinates]);

  useEffect(() => {
    getPromotedBukkas(coordinates);
  }, [fetchedPromotedBukkas]);

  useEffect(() => {
    handleFetchOnRefresh();
  }, [nearbyBukkas]);

  if (!loading && nearbyBukkas.length === 0
    && coordinates.length !== 0 && errorMessage) {
    return <NoNearByBukkaLocation history={{ push }} />;
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {nearbyBukkas.length > 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <div className={displayMap ? 'd-none' : ''}>
              <AreasToExplore bgImage={foodBannerImage} />
            </div>
            <div
              className={displayMap ? 'feed-main-content-map' : 'feed-main-content'}
            >
              <LocationNavLargeScreen handleMapClick={handleClick} />
              <LocationNavSmallScreen />
              <div>
                {mode === 'delivery' &&
                <BukkasToExploreSection
                  push={push}
                  promotedBukkas={fetchedPromotedBukkas}
                  fetchedCuisines={fetchedCuisines}
                />
                }
                <Container
                  classNames={mapContainerDisplay(displayMap)}
                >
                  <div className={mapContentDisplay(displayMap)}>
                    <NearestFreshOrMart
                      delivery
                      classNames={displayMap ? 'col-12' : 'col-xl-4 col-md-6 col-sm-12'}
                      title={displayMap ? '' : 'Nearby'}
                      bukkaData={[...nearbyBukkas]}
                      imageHeight={displayMap ? 'map-img-height' : 'img-height'}
                      currentPage={currentPage}
                      errorMessage={errorMessage}
                      push={push}
                    />
                  </div>
                  <div className={mapDisplay(displayMap)}>
                    <Map restaurants={nearbyBukkas} coordinates={coordinates} />
                  </div>
                  {/* display carousel for map on small & medium screen */}
                  {displayMap && (
                    <div
                      className="d-flex d-md-flex d-lg-none d-xl-none px-0 col-12"
                    >
                      <Carousel
                        delivery
                        noOfImagesShown={1}
                        xl={1}
                        lg={1}
                        md={1}
                        sm={1}
                        slideItems={[...favorites, ...freeDelivery]}
                        imageHeight="img-fluid"
                        classNames="col-lg-6 col-md-6 col-sm-12 col-12"
                      />
                    </div>
                  )}
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
  loadingReducer: { status: loading },
  deliveryModeReducer: { mode },
  bukkasReducer: { fetchedBukkas, status, currentPage, errorMessage },
  selectedLocationReducer: { coordinates },
  promotionReducer: { fetchedBukkas: fetchedPromotedBukkas },
  cuisineReducer: { fetchedBukkas: fetchedCuisines }
}) => ({
  fetchedBukkas,
  fetchedCuisines,
  fetchedPromotedBukkas,
  status,
  currentPage,
  coordinates,
  mode,
  errorMessage,
  loading,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas },
)(NearestFreshMartSection);

NearestFreshMartSection.propTypes = {
  mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
};
