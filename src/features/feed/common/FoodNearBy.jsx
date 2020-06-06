/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
// import SmallSpinner from 'Components/spinners/SmallSpinner';
import Row from 'Components/grid/Row';
import fetchBukkaAction from 'Redux/fetchBukkaAction';
import Container from 'Components/container/Container';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import { useLocationContext } from '../../../context/LocationContext';
import fetchBukkas from '../actionCreators/fetchMoreBukkas';

const FoodNearBy = ({
  bukkaData,
  title,
  classNames,
  children,
  handleRefFocus,
  fetchMoreBukkas,
  currentPage,
  errorMessage,
  fetchBukkaMenu,
  fetchBukka,
  noMargin,
  onMouseEnter,
  onMouseLeave
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();

  const handleClick = (event, bukka) => {
    event.preventDefault();
    fetchBukkaMenu(`${bukka.slug}`)
      .then(() => fetchBukka(bukka.slug))
      .then(() => push(`/bukka/${bukka.slug}`));
  };

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

  return (
    <div className={!(noMargin && 'mt-4 mb-4') || ''}>
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
              {bukkaData.map((bukka, idx) => (
                <BukkaCard
                  key={`food-nearby-data-card-${bukka.name}-${bukka.slug}-${idx}`}
                  imageUrl={decodeStoreImage(bukka)}
                  mealName={bukka.name}
                  tags={bukka.placeGroup}
                  handleClick={e => handleClick(e, bukka)}
                  deliveryPrice={decodeDeliveryPrice(bukka)}
                  deliveryTime={decodeDeliveryTime(bukka)}
                  rating={bukka.rating}
                  imageHeight="img-fluid"
                  classNames={classNames}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  href={`/bukka/${bukka.slug}`}
                />
              ))}
            </Row>
          </InfiniteScroll>
        )}
      </Container>
    </div>
  );
};

export default connect(
  () => ({}),
  { fetchMoreBukkas: fetchBukkas,
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchBukka: fetchBukkaAction, }
)(FoodNearBy);

FoodNearBy.defaultProps = {
  children: '',
  heading: true,
  title: '',
  handleRefFocus: () => {},
  currentPage: 1,
  errorMessage: '',
  fetchBukkaMenu: () => {},
};

FoodNearBy.propTypes = {
  fetchBukkaMenu: PropTypes.func,
  handleRefFocus: PropTypes.func,
  title: PropTypes.string,
  classNames: PropTypes.string.isRequired,
  fetchMoreBukkas: PropTypes.func.isRequired,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
