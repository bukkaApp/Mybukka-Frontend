import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';
import Navbar from 'Components/navbar';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import NotAvailable from 'Components/not-found/NotAvailable';

import shortId from 'shortid';

// import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import ExploreSection from '../common/ExploreSection';
// import NearByBukka from './NearByBukka';

// TODO: Don't  display time if bukkas are not avaailable or they have closed

import searchData from '../data/search.json';
import categories from '../data/cuisine.json';

import './searchresult.scss';

const Headline = ({ title, views }) => (
  <Container>
    <div className="headline">
      <div
        className="runner"
        style={{ transform: 'translateX(100% - 32px)' }}
      />
      <h2 className="headline-h2">{title}</h2>
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
  push,
  coordinates,
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  status: { error },
}) => {
  const [searchQuery, setSearchQuery] = useState({
    by: '',
    value: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchNearbyBukkas(coordinates, 1, 100, searchQuery.by, searchQuery.value);
  }, [coordinates]);

  useEffect(() => {
    if (nearbyBukkas.length > 0 && searchQuery.value.length > 0) {
      const newSearchResult = nearbyBukkas.filter(bukka =>
        bukka[searchQuery.by].includes(searchQuery.value)
      );
      setSearchResults(newSearchResult);
    }
  }, [searchQuery]);

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
            {searchResults.length === 0 && <Headline title={searchQuery.value || '"Search"'} />}
            {searchResults.length > 0 && (
              <Headline
                title={`“ ${searchQuery.value} ”`}
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
                      classNames="col-lg-4 col-md-4 col-sm-12"
                      dataTarget="#bukkaAddToCart"
                      dataToggle="modal"
                    />
                  ))}
                </Row>
              )}
              {/* show categories if there is no search */}
              <>
                {(searchQuery.value.length === 0 ||
                  searchResults.length === 0) && (
                  <Row classNames="pb-4">
                  {console.log(searchQuery)}
                    {categories.map(category => (
                      <BukkaCard
                        top
                        textOverlay
                        key={shortId.generate()}
                        imageUrl={category.imageUrl}
                        mealName={category.id}
                        deliveryPrice={category.deliveryPrice}
                        deliveryTime={category.deliveryTime}
                        rating={category.rating}
                        imageHeight="img-height"
                        classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                        dataTarget="#bukkaAddToCart"
                        dataToggle="modal"
                        href={`/search?by=majorCuisine&value=${category.id}`}
                        handleClick={() =>
                          setSearchQuery({
                            by: 'majorCuisine',
                            value: category.id
                          })
                        }
                      />
                    ))}
                  </Row>
                )}
              </>
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
  selectedLocationReducer: { coordinates }
}) => ({
  search,
  fetchedBukkas,
  status,
  coordinates,
  mode
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas }
)(withRouter(FoodSection));

FoodSection.propTypes = {
  search: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
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
