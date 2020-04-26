/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import shortId from 'shortid';

import BukkaCard from 'Components/Carousel/BukkaCard';
import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import getBukkasRelatedToSingleCuisines from '../actionCreators/getBukkasRelatedToSingleCuisines';
import getMoreBukkasRelatedToSingleCuisines from '../actionCreators/getMoreBukkasRelatedToSingleCuisines';


import { useLocationContext } from '../../../context/LocationContext';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

import './searchresult.scss';

const Headline = ({ title, views }) => (
  <Container>
    <div className="headline">
      <blockquote>
        <h2 className="headline-h2">
          {title}
        </h2>
      </blockquote>
      {views > 0 && (
        <a className="headline-link" href="/" rel="nofollow">
          <span className="d-none pr-3 d-sm-inline-flex">
            {views} {views > 1 ? 'Results' : 'Result'}
          </span>
        </a>
      )}
    </div>
  </Container>
);

const FoodSection = ({
  search,
  fetchNearbyBukkas,
  status: { error },
  location: match,
  cuisineItems,
  errorMessage,
  currentPage,
  cuisineToDisplay: { name },
  getMoreBukkasRelatedToCuisines,
  getBukkasRelatedToCuisines,
  fetchBukkaMenu,
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState({
    by: '',
    value: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log('match', match);
    let suscribed = true;//eslint-disable-line
    getBukkasRelatedToCuisines('american', coordinates);
    return () => {
      suscribed = false;
    };
  }, [coordinates]);

  useEffect(() => {
    fetchNearbyBukkas(coordinates, 1, 100, searchQuery.by, searchQuery.value);
  }, [coordinates, searchQuery]);

  useEffect(() => {
    if (cuisineItems.length > 0 && searchQuery.value.length > 0) {
      const newSearchResult = cuisineItems.filter(bukka =>
        bukka[searchQuery.by].includes(searchQuery.value)
      );
      setSearchResults(newSearchResult);
    }
  }, [cuisineItems, searchQuery]);

  useEffect(() => {
    setSearchQuery({ by: 'name', value: search });
    push(`/search?by=name&value=${search}`);
  }, [search]);

  const handleChange = () => {};

  return (
    <div className="search-result-scene container-fluid p-0">
      <div>
        <IntroSection handleChange={handleChange} push={push} />
        <ExploreSection classNames="pt-5">
          <div className="mt-130 mb-4">
            {searchResults.length === 0 && <Headline title={searchQuery.value || 'Search'} />}
            {searchResults.length > 0 && (
              <Headline
                title={`${searchQuery.value}`}
                views={searchResults}
              />
            )}
            <Container classNames="px-0">
              {searchResults.length > 0 ? (
                <div className="col-md-3 col-lg-2">
                  <DeliveryOrPickupNav />
                </div>
              ) : (
                <h6 className="pl-3">EXPLORE TOP CUISINES</h6>
              )}
            </Container>
            <>
              {searchResults.length === 0 && searchQuery.value.length > 0 && (
                <h2 className="text-center" style={{ marginTop: '50px' }}>
                  Your search returned no results
                </h2>
              )}
            </>
            <Container>
              {searchResults.length > 0 && (
                <Row classNames="pb-4">
                  {searchResults.map(bukka => (
                    <BukkaCard
                      key={shortId.generate()}
                      imageUrl={bukka.imageUrl}
                      mealName={bukka.name}
                      deliveryPrice={bukka.deliveryPrice}
                      deliveryTime={bukka.deliveryTime}
                      rating={bukka.rating}
                      imageHeight="img-height"
                      classNames="col-xl-4 col-md-6 col-sm-12"
                      dataTarget="#bukkaAddToCart"
                      dataToggle="modal"
                    />
                  ))}
                </Row>
              )}
              {/* show categories if there is no search */}
              <InfiniteScroll
                loadMore={() =>
                  getMoreBukkasRelatedToCuisines(
                    'american', coordinates, Number(currentPage) + 1)}
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
                      classNames="col-xl-4 col-md-6 col-sm-12"
                      href={`/bukka/${bukka.slug}`}
                    />
                  ))}
                </Row>
              </InfiniteScroll>
            </Container>
          </div>
        </ExploreSection>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  searchAnythingReducer: { search },
  bukkasReducer: { fetchedBukkas, status },
  cuisineReducer: {
    cuisineItems, errorMessage,
    currentPage,
    cuisineToDisplay: { name },
  },
}) => ({
  search,
  fetchedBukkas,
  status,
  mode,
  cuisineItems,
  errorMessage,
  currentPage,
  cuisineToDisplay: { name },
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas,
    fetchBukkaMenu: fetchBukkaMenuAction,
    getBukkasRelatedToCuisines: getBukkasRelatedToSingleCuisines,
    getMoreBukkasRelatedToCuisines: getMoreBukkasRelatedToSingleCuisines, }
)(withRouter(FoodSection));

FoodSection.propTypes = {
  search: PropTypes.string.isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired
};

Headline.defaultProps = {
  views: 0
};

Headline.propTypes = {
  views: PropTypes.number,
  title: PropTypes.string.isRequired
};
