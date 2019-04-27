import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  status: { error }
}) => {
  const [resultFound, setResultFound] = useState(0);
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    const value = searchData.reduce((initVal, bukka) => {
      if (search && bukka.title.includes(search)) {
        initVal += 1;
      }
      return initVal;
    }, 0);
    setResultFound(value);
    push(`/search?q=${search.split(' ').join('-')}`);
  }, [search, parsed.q]);

  useEffect(() => {
    fetchNearbyBukkas(coordinates);
  }, [coordinates]);

  const handleChange = () => {

  };

  if (nearbyBukkas.length === 0 && error) {
    return (
      <div>
        <Navbar push={push} />
        <NotAvailable />
      </div>
    );
  }

  return (
    <div className="search-result-scene container-fluid p-0">
      {nearbyBukkas.length >= 0 && (
        <div>
          <IntroSection handleChange={handleChange} push={push} />
          <ExploreSection classNames="pt-5">
            <div className="mt-130 mb-4">
              {!search && <Headline title="Search" />}
              {search &&
              <Headline
                title={`“ ${search} ”`}
                views={resultFound}
              />}
              <Container classNames="px-0">
                {search ?
                  <div className="col-md-3 col-lg-2">
                    <DeliveryOrPickupNav />
                  </div>
                  : <h6 className="pl-3">EXPLORE TOP CUISINES</h6>
                }
              </Container>
              <Container>
                {searchData.length > 0 && (
                  <Row classNames="pb-4">
                    {searchData.map((bukka) => {
                      if (search && bukka.title.includes(search)) {
                        return (
                          <BukkaCard
                            key={shortId.generate()}
                            imageUrl={bukka.imageUrl}
                            mealName={bukka.title}
                            deliveryPrice={bukka.deliveryCost}
                            deliveryTime={bukka.deliveryTime}
                            rating={bukka.rating}
                            imageHeight="img-height"
                            classNames="col-lg-4 col-md-4 col-sm-12"
                            dataTarget="#bukkaAddToCart"
                            dataToggle="modal"
                          />
                        );
                      }
                      return null;
                    })}
                  </Row>
                )}
                {/* show categories if there is no search */}
                {!search && (
                  <Row classNames="pb-4">
                    {categories.map(category => (
                      <BukkaCard
                        top
                        textOverlay
                        key={shortId.generate()}
                        imageUrl={category.imageUrl}
                        heading={category.heading}
                        deliveryPrice={category.deliveryCost}
                        deliveryTime={category.deliveryTime}
                        rating={category.rating}
                        imageHeight="img-height"
                        classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                        dataTarget="#bukkaAddToCart"
                        dataToggle="modal"
                      />
                    ))}
                  </Row>
                )}
              </Container>
            </div>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  searchAnythingReducer: { search },
  bukkasReducer: { fetchedBukkas, status },
  selectedLocationReducer: { coordinates },
}) => ({
  search,
  fetchedBukkas,
  status,
  coordinates,
  mode,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas }
)(FoodSection);

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
  views: 0,
};

Headline.propTypes = {
  views: PropTypes.number,
  title: PropTypes.string.isRequired,
};
