import React, { Fragment, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'Components/grid/Row';

import LocationNavLargeScreen from 'Components/common-navs/LocationNavLargeScreen';

import LocationNavSmallScreen from 'Components/common-navs/LocationNavSmallScreen';

import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';
import Carousel from 'Components/Carousel/Carousel';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Headline from 'Components/Carousel/Headline';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import NearByBukka from './NearByBukka';

import bukkaData from './bukkaData.json';

import './feed.scss';

const FeedPage = ({
  mode,
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
      {nearbyBukkas.length !== 0 && (
        <div>
          <IntroSection push={push} />
          <div
            className="d-none sticky-nav-bar d-md-flex"
            style={{ zIndex: '200' }}
          >
            <LocationNavLargeScreen />
          </div>
          <div
            className="d-sm-block sticky-nav-bar d-md-none d-lg-none d-xl-none"
            style={{ zIndex: '200' }}
          >
            <LocationNavSmallScreen />
          </div>

          <div
            className="bg-white col-lg-12 col-md-12 col-sm-12"
            style={{ zIndex: '150' }}
          >
            <main className="main-container pr-0 pl-0 mx-auto col-lg-10 col-md-12 col-sm-12">
              {mode === 'delivery' && (
                <Fragment>
                  <Carousel
                    noOfImagesShown={2}
                    title="New on Bukka"
                    textOverlay
                    slideItems={bukkaData}
                    imageHeight="img-big-height"
                    classNames="col-lg-6 col-md-6 col-sm-12 col-12"
                  />

                  <Carousel
                    noOfImagesShown={3}
                    title="$1.99 Delivery"
                    slideItems={bukkaData}
                    imageHeight="img-height"
                    classNames="col-lg-4 col-md-4 col-sm-12 col-12"
                  />

                  <Fragment>
                    <div className="carousel-divider" />
                    <Headline title="Salty & Sweet" activeIndex={1} />
                    <Row classNames="pb-4 ml-1">
                      <BukkaCard
                        imageUrl={bukkaData[0].imageUrl}
                        deliveryCost={bukkaData[0].deliveryCost}
                        deliveryTime={bukkaData[0].deliveryTime}
                        rating={bukkaData[0].rating}
                        imageHeight="img-height"
                        classNames="col-lg-4 col-md-6 col-sm-12"
                      />
                    </Row>
                  </Fragment>

                  <Carousel
                    noOfImagesShown={4}
                    title="Touchdown"
                    imageHeight="small-img-height"
                    slideItems={bukkaData}
                    classNames="col-lg-3 col-md-4 col-sm-12 col-12 touchdown"
                  />
                </Fragment>
              )}

              <Fragment>
                <div className="carousel-divider" />
                <NearByBukka bukkaData={nearbyBukkas} />
              </Fragment>
            </main>
          </div>
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
)(FeedPage);

FeedPage.propTypes = {
  mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
