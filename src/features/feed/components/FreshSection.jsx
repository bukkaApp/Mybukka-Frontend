import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';

import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen, {
  ResponsiveCategories,
} from 'Components/navbar/BukkaNavSmallScreen';

import shortId from 'shortid';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import CheckoutButton from 'Components/common/CheckoutButton';
import Navbar from 'Components/navbar';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';

import AddToCart from './AddToCart';
import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { freshBannerImage } from '../img/imgLinks';

const FreshSection = ({
  // mode,
  push,
  coordinates,
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  freshBukkas, // eslint-disable-line
  status: { error },
}) => {
  const [searchResultCategories, setCategories] = useState([]);
  const [searches, setSearch] = useState('');
  const bukkaCategories = [
    ...new Set(freshBukkas.map(mealData => mealData.bukka)),
  ];

  const handleSearch = async ({ target: { value } }) => {
    setSearch(value.toLowerCase());
  };

  useEffect(() => {
    fetchNearbyBukkas(coordinates);
  }, [coordinates]);

  useEffect(() => {
    const searchResult = [
      ...new Set(
        freshBukkas
          .filter(mealData => mealData.title.toLowerCase().includes(searches))
          .map(mealData => mealData.bukka),
      ),
    ];
    setCategories([...searchResult]);
  }, [searches]);

  // if (nearbyBukkas.length === 0 && error) {
    if (true) {
    return (
      <div>
        <Navbar push={push} />
        <NoNearByBukkaLocation />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <AddToCart />
      <ResponsiveCategories placeholderText="Search Fresh" />
      <SelectLocationModal delivery />
      {nearbyBukkas.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore text="Groceries" bgImage={freshBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen
                scheduleTime
                handleSearch={handleSearch}
              />
              <BukkaNavSmallScreen currentCategory="Customers Love" />
              <LocationNavSmallScreen bukka />
              <div>
                {!searches &&
                  bukkaCategories.map(eachBukka => (
                    <Fragment key={shortId.generate()}>
                      <div className="carousel-divider" />
                      <Container classNames="px-0">
                        <div className="mt-4 mb-4">
                          <Headline title={eachBukka} activeIndex={1} />
                          <Container>
                            <Row classNames="pb-4">
                              {freshBukkas.map(mealData => {
                                if (mealData.bukka !== eachBukka) {
                                  return null;
                                }
                                return (
                                  <BukkaCard
                                    key={shortId.generate()}
                                    imageUrl={mealData.imageUrl}
                                    mealName={mealData.title}
                                    deliveryPrice={mealData.deliveryCost}
                                    deliveryTime={mealData.deliveryTime}
                                    rating={mealData.rating}
                                    imageHeight="fresh-img-height"
                                    classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                                    dataTarget="#bukkaAddToCart"
                                    dataToggle="modal"
                                  />
                                );
                              })}
                            </Row>
                          </Container>
                        </div>
                      </Container>
                    </Fragment>
                  ))}
                {searches &&
                  searchResultCategories.length > 0 &&
                  searchResultCategories.map(eachBukka => (
                    <Fragment key={shortId.generate()}>
                      <div className="carousel-divider" />
                      <Container classNames="px-0">
                        <div className="mt-4 mb-4">
                          <Headline title={eachBukka} activeIndex={1} />
                          <Container>
                            <Row classNames="pb-4">
                              {freshBukkas.map(mealData => {
                                if (
                                  mealData.bukka === eachBukka &&
                                  mealData.title
                                    .toLowerCase()
                                    .includes(searches)
                                ) {
                                  return (
                                    <BukkaCard
                                      key={shortId.generate()}
                                      imageUrl={mealData.imageUrl}
                                      mealName={mealData.title}
                                      deliveryPrice={mealData.deliveryCost}
                                      deliveryTime={mealData.deliveryTime}
                                      rating={mealData.rating}
                                      imageHeight="fresh-img-height"
                                      classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                                      dataTarget="#bukkaAddToCart"
                                      dataToggle="modal"
                                    />
                                  );
                                }
                                return null;
                              })}
                            </Row>
                          </Container>
                        </div>
                      </Container>
                    </Fragment>
                  ))}
              </div>
            </div>
          </ExploreSection>
        </div>
      )}
      <CheckoutButton />
      <UnAuthenticatedCheckout push={push} />
    </div>
  );
};

const mapStateToProps = ({
  deliveryModeReducer: { mode },
  bukkasReducer: { fetchedBukkas, status },
  freshReducer: {
    fetchedBukkas: { nearbyBukkas: freshBukkas },
  },
  selectedLocationReducer: { coordinates },
}) => ({
  fetchedBukkas,
  status,
  coordinates,
  mode,
  freshBukkas,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas },
)(FreshSection);

FreshSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
};
