import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Row from 'Components/grid/Row';
import Container from 'Components/container/Container';

import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
<<<<<<< HEAD
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen, {
  ResponsiveCategories,
=======
  SelectLocationModal
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen, {
  ResponsiveCategories
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
} from 'Components/navbar/BukkaNavSmallScreen';

import shortId from 'shortid';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import CheckoutButton from 'Components/common/CheckoutButton';
import Navbar from 'Components/navbar';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';

import fetchCartAction from 'Redux/fetchCartAction';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { freshBannerImage } from '../img/imgLinks';

const FreshSection = ({
  // mode,
  push,
  coordinates,
<<<<<<< HEAD
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  freshBukkas, // eslint-disable-line
  status: { error },
=======
  fetchedBukkas: { bukkaMenu },
  fetchBukkaMenu,
  status: { error },
  cartIsUpdated,
  fetchCart,
  authenticated,
  freshBukkas
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const bukkaCategories = [
    ...new Set(freshBukkas.map(mealData => mealData.bukka)),
  ];

  useEffect(() => {
    fetchBukkaMenu('sample_bukka_fresh_drinks', 'fresh');
  }, [coordinates]);

<<<<<<< HEAD
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
=======
  // useEffect(() => {
  //   const searchResult = [
  //     ...new Set(freshBukkas
  //       .filter(mealData => mealData.title.toLowerCase().includes(searches))
  //       .map(mealData => mealData.bukka)
  //     )
  //   ];
  //   setCategories([...searchResult]);
  // }, [searches]);

  if (bukkaMenu.length === 1 && error) {
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
    return (
      <div>
        <Navbar push={push} />
        <NoNearByBukkaLocation />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {bukkaMenu.length >= 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore text="Groceries" bgImage={freshBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen
                scheduleTime
<<<<<<< HEAD
                handleSearch={handleSearch}
=======
                handleSearch={event => setSearchQuery(event.target.value)}
                categoryItems={categories}
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
              />
              <BukkaNavSmallScreen currentCategory="Customers Love" />
              <LocationNavSmallScreen bukka />
              <div>
<<<<<<< HEAD
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
=======
                {bukkaCategories.map(eachBukka => (
                  <Fragment key={shortId.generate()}>
                    <div className="carousel-divider" />
                    <Container classNames="px-0">
                      <div className="mt-4 mb-4">
                        <Headline title={eachBukka} activeIndex={1} />
                        <Container>
                          <Row classNames="pb-4">
                            {freshBukkas.map(mealData => (
                              <>
                                {mealData.category === category && (
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
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
<<<<<<< HEAD
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
=======
                                )}
                              </>
                            ))}
                          </Row>
                        </Container>
                      </div>
                    </Container>
                  </Fragment>
                ))}
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
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
<<<<<<< HEAD
    fetchedBukkas: { nearbyBukkas: freshBukkas },
=======
    fetchedBukkas: { nearbyBukkas: freshBukkas }
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
  },
  selectedLocationReducer: { coordinates },
  cartReducer: {
    status: { updated, error }
  },
  authenticationReducer: {
    status: { authenticated }
  }
}) => ({
  fetchedBukkas,
  status,
  coordinates,
  mode,
<<<<<<< HEAD
  freshBukkas,
=======
  cartIsUpdated: updated,
  errorUpdatingCart: error,
  authenticated,
  freshBukkas
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
});

export default connect(
  mapStateToProps,
<<<<<<< HEAD
  { fetchNearbyBukkas: fetchBukkas },
=======
  { fetchBukkaMenu: fetchBukkaMenuAction, fetchCart: fetchCartAction }
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
)(FreshSection);

FreshSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
<<<<<<< HEAD
  fetchNearbyBukkas: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
=======
  fetchBukkaMenu: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  cartIsUpdated: PropTypes.bool.isRequired,
  fetchCart: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
>>>>>>> 5606f3dce4d504434e1c5ab4bdf1de22f0cf1b2b
};
