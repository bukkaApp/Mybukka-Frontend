import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import BukkaCard from 'Components/Carousel/BukkaCard';
import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import getBukkasRelatedToSingleCuisines from '../actionCreators/getBukkasRelatedToSingleCuisines';
import getMoreBukkasRelatedToSingleCuisines from '../actionCreators/getMoreBukkasRelatedToSingleCuisines';


import { useLocationContext } from '../../../context/LocationContext';

import fetchBukkas from '../actionCreators/fetchBukkas';
// TODO: Don't  display time if bukkas are not avaailable or they have closed


export const Headline = ({ title, views }) => (
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

const SearchItems = ({
  cuisineItems,
  errorMessage,
  currentPage,
  getMoreBukkasRelatedToCuisines,
  searchResults,
  fetchBukkaMenu,
}) => {
  const { coordinates } = useLocationContext();
  return (
    <Container>
      {searchResults.length > 0 && (
        <Row classNames="pb-4">
          {searchResults.map(bukka => (
            <BukkaCard
              key={`search-store-${bukka.name}-${bukka._id}`}
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
              key={`search-cuisine-item-${bukka.name}-${bukka._id}`}
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
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  searchAnythingReducer: { search },
  businessesReducer: { fetchedBukkas, status },
  businessGroupReducer: {
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
)(withRouter(SearchItems));

SearchItems.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
};

Headline.defaultProps = {
  views: 0
};

Headline.propTypes = {
  views: PropTypes.number,
  title: PropTypes.string.isRequired
};
