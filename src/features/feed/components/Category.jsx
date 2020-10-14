import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroller';
import Row from 'Components/grid/Row';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Container from 'Components/container/Container';
import Navbar from '../../../components/navbar/index';
import NotAvailable from 'Components/not-found/NotAvailable';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import { useLocationContext } from '../../../context/LocationContext';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';
import getBukkasRelatedToSingleCuisines from '../actionCreators/getBukkasRelatedToSingleCuisines';
import getMoreBukkasRelatedToSingleCuisines from '../actionCreators/getMoreBukkasRelatedToSingleCuisines';

// TODO: Don't  display time if bukkas are not available or they have closed

const PlaceGroup = ({
  name,
  push,
  cuisineItems,
  getBukkasRelatedToCuisines,
  status: { error },
  errorMessage,
  currentPage,
  fetchBukkaMenu,
  getMoreBukkasRelatedToCuisines,
}) => {
  const { coordinates } = useLocationContext();
  const { id } = useParams();

  const decodeDeliveryTime = (bukka) => {
    if (bukka && bukka.logistics) {
      const maxTime = bukka.logistics.deliveryTimeTo;
      return maxTime > 60 ? maxTime / 60 : maxTime;
    }
    return bukka.deliveryTime;
  };

  const decodeDeliveryPrice = (bukka) => {
    if (bukka && bukka.logistics) {
      return bukka.logistics.deliveryPrice;
    }
    return bukka.deliveryPrice;
  };

  const decodeStoreImage = (bukka) => {
    if (bukka && bukka.headerImg) {
      return bukka.headerImg;
    }
    return bukka.imageUrl;
  };

  useEffect(() => {
    let suscribed = true;//eslint-disable-line
    getBukkasRelatedToCuisines(id, coordinates);
    return () => {
      suscribed = false;
    };
  }, [id, coordinates]);

  if (cuisineItems.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="Place__Group container-fluid p-0">
      {cuisineItems.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection classNames="pt-5">
            <Container classNames="position-sticky top-114">
              <h2 className="place-group-header pt-100 capitalize pb-3">
                {name}
              </h2>
            </Container>
            <div className="border-top" />
            <Container classNames="position-relative bg-white">
              <InfiniteScroll
                loadMore={() =>
                  getMoreBukkasRelatedToCuisines(
                    id, coordinates, Number(currentPage) + 1)}
                hasMore={errorMessage === ''}
                loader={
                  <div className="loader text-center" key={0}>
                    <div className="spinner-grow custom-text-color" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                useWindow
                initialLoad={false}
              >
                <Row classNames="pb-4">
                  {cuisineItems.map(bukka => (
                    <BukkaCard
                      key={`place-group-bukka-card-${bukka.name}-${bukka.slug}`}
                      imageUrl={decodeStoreImage(bukka)}
                      mealName={bukka.name}
                      delivery={false}
                      handleClick={() => fetchBukkaMenu(`/bukka/${bukka.slug}`)}
                      deliveryPrice={decodeDeliveryPrice(bukka)}
                      deliveryTime={decodeDeliveryTime(bukka)}
                      rating={bukka.rating}
                      tags={bukka.placeGroup}
                      imageHeight="img-fluid"
                      classNames="col-xl-4 col-md-6 col-sm-12"
                      href={`/bukka/${bukka.slug}`}
                    />
                  ))}
                </Row>
              </InfiniteScroll>
            </Container>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  businessesReducer: { fetchedBukkas, status },
  businessGroupReducer: {
    cuisineItems, errorMessage,
    currentPage,
    cuisineToDisplay: { name },
  },
}) => ({
  fetchedBukkas,
  status,
  mode,
  name,
  cuisineItems,
  errorMessage,
  currentPage,
});

export default connect(
  mapStateToProps,
  { getBukkasRelatedToCuisines: getBukkasRelatedToSingleCuisines,
    getMoreBukkasRelatedToCuisines: getMoreBukkasRelatedToSingleCuisines,
    fetchBukkaMenu: fetchBukkaMenuAction, }
)(PlaceGroup);

PlaceGroup.defaultProps = {
  errorMessage: '',
};

PlaceGroup.propTypes = {
  errorMessage: PropTypes.string,
  getMoreBukkasRelatedToCuisines: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  cuisineItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getBukkasRelatedToCuisines: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
