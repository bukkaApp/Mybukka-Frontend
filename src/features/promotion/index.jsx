import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import shortId from 'shortid';
import InfiniteScroll from 'react-infinite-scroller';
import Row from 'Components/grid/Row';
import BukkaCard from 'Components/Carousel/BukkaCard';
import Container from 'Components/container/Container';
import Navbar from 'Components/navbar';
import NotAvailable from 'Components/not-found/NotAvailable';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import IntroSection from '../feed/common/IntroSection';
import ExploreSection from '../feed/common/ExploreSection';
import getSinglePromotedBukkasAction from './actionCreators/getSinglePromotedBukkas';
import getMoreSinglePromotionBukkasAction from './actionCreators/getMoreSinglePromotionBukkas';

import './index.scss';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

const PlaceGroup = ({
  name,
  push,
  promotedBukkas,
  getSinglePromotedBukkas,
  placeId,
  status: { error },
  errorMessage,
  currentPage,
  coordinates,
  fetchBukkaMenu,
  getMoreSinglePromotionBukkas,
}) => {
  useEffect(() => {
    let suscribed = true;//eslint-disable-line
    getSinglePromotedBukkas(placeId, coordinates);
    return () => {
      suscribed = false;
    };
  }, [placeId]);

  if (promotedBukkas.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="Place__Group container-fluid p-0">
      {promotedBukkas.length >= 0 && (
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
                  getMoreSinglePromotionBukkas(
                    placeId, coordinates, Number(currentPage) + 1)}
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
                  {promotedBukkas.map(bukka => (
                    <BukkaCard
                      key={shortId.generate()}
                      imageUrl={bukka.imageUrl}
                      mealName={bukka.name}
                      delivery={false}
                      handleClick={() => fetchBukkaMenu(`/bukka/${bukka.slug}`)}
                      deliveryPrice={bukka.deliveryPrice}
                      deliveryTime={bukka.deliveryTime}
                      rating={bukka.rating}
                      tags={bukka.placeGroup}
                      imageHeight="img-fluid"
                      classNames="col-lg-4 col-md-4 col-sm-12"
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
  bukkasReducer: { fetchedBukkas, status },
  selectedLocationReducer: { coordinates },
  getPromotedBukkasReducer: {
    promotedBukkas, errorMessage, promotionToDisplay: { name, slug },
    currentPage,
  },
}) => ({
  coordinates,
  fetchedBukkas,
  status,
  placeId: slug,
  mode,
  name,
  promotedBukkas,
  errorMessage,
  currentPage,
});

export default connect(
  mapStateToProps,
  { getSinglePromotedBukkas: getSinglePromotedBukkasAction,
    getMoreSinglePromotionBukkas: getMoreSinglePromotionBukkasAction,
    fetchBukkaMenu: fetchBukkaMenuAction, }
)(PlaceGroup);

PlaceGroup.defaultProps = {
  errorMessage: '',
};

PlaceGroup.propTypes = {
  errorMessage: PropTypes.string,
  getMoreSinglePromotionBukkas: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  name: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  promotedBukkas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getSinglePromotedBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};
