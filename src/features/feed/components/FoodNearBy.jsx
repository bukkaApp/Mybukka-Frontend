import React from 'react';

import { connect } from 'react-redux';
import shortId from 'shortid';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

// import SmallSpinner from 'Components/spinners/SmallSpinner';
import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import fetchBukkas from '../actionCreators/fetchMoreBukkas';

const FoodNearBy = ({
  delivery,
  bukkaData,
  title,
  classNames,
  imageHeight,
  children,
  handleRefFocus,
  coordinates,
  fetchMoreBukkas,
  currentPage,
  errorMessage,
  fetchBukkaMenu,
}) => (
  <div className="mt-4 mb-4">
    {title && (
      <Headline handleRefFocus={handleRefFocus} title={title} activeIndex={1} />
    )}
    {children}
    <Container>
      {bukkaData.length > 0 && (
        <InfiniteScroll
          loadMore={() =>
            fetchMoreBukkas(coordinates, Number(currentPage) + 1)}
          hasMore={
            errorMessage !== 'There are currently no bukkas in your location'
          }
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
            {bukkaData.map(bukka => (
              <BukkaCard
                key={shortId.generate()}
                imageUrl={bukka.imageUrl}
                mealName={bukka.name}
                delivery={delivery}
                tags={bukka.placeGroup}
                handleClick={() => fetchBukkaMenu(`/bukka/${bukka.slug}`)}
                deliveryPrice={bukka.deliveryPrice}
                deliveryTime={bukka.deliveryTime}
                rating={bukka.rating}
                imageHeight="img-fluid"
                classNames={classNames}
                href={`/bukka/${bukka.slug}`}
              />
            ))}
          </Row>
        </InfiniteScroll>
      )}
    </Container>
  </div>
);

const mapStateToProps = ({
  selectedLocationReducer: { coordinates },
}) => ({
  coordinates,
});

export default connect(
  mapStateToProps,
  { fetchMoreBukkas: fetchBukkas,
    fetchBukkaMenu: fetchBukkaMenuAction }
)(FoodNearBy);

FoodNearBy.defaultProps = {
  children: '',
  heading: true,
  title: '',
  delivery: false,
  handleRefFocus: () => {},
  coordinates: [],
  currentPage: 1,
  errorMessage: '',
  fetchBukkaMenu: () => {},
};

FoodNearBy.propTypes = {
  fetchBukkaMenu: PropTypes.func,
  delivery: PropTypes.bool,
  handleRefFocus: PropTypes.func,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  imageHeight: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number),
  fetchMoreBukkas: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  errorMessage: PropTypes.string,
  bukkaData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      deliveryCost: PropTypes.number,
      deliveryTime: PropTypes.string,
      rating: PropTypes.string
    })
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
