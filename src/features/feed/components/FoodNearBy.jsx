import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import shortId from 'shortid';
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
  delivery,
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
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();

  const handleClick = (event, bukka) => {
    event.preventDefault();
    fetchBukkaMenu(`${bukka.slug}`)
      .then(() => fetchBukka(bukka.slug))
      .then(() => push(`/bukka/${bukka.slug}`));
  };

  return (
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
                  handleClick={e => handleClick(e, bukka)}
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
  delivery: false,
  handleRefFocus: () => {},
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
