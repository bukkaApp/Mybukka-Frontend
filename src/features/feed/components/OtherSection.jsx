import React, { useEffect, Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from 'Components/container/Container';

import shortId from 'shortid';

import Row from 'Components/grid/Row';
import Headline from 'Components/Carousel/Headline';
import BukkaCard from 'Components/Carousel/BukkaCard';

import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';

import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';

import BukkaNavSmallScreen, {
  ResponsiveCategories,
} from 'Components/navbar/BukkaNavSmallScreen';

import CheckoutButton from 'Components/common/CheckoutButton';
import Navbar from 'Components/navbar';

import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';
import setMealToDisplayAction from 'Redux/setMealToDisplayAction';

import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { drinkBannerImage } from '../img/imgLinks';

const OtherSection = ({
  // mode,
  push,
  coordinates,
  bukkaMenu,
  fetchBukkaMenu,
  categories,
  error,
  errorMessage,
  fetched,
  setMealToDisplay,
  type,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBukkaMenu('sample_bukka_fresh_drinks', type);
  }, [coordinates, type]);

  if (bukkaMenu.length === 1 && error) {
    return (
      <div>
        <Navbar push={push} />
        {push('/not-found/bukkas')}
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {bukkaMenu.length > 1 && fetched && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <AreasToExplore text="Drinks" bgImage={drinkBannerImage} />
            <div className="feed-main-content">
              <LocationNavLargeScreen
                scheduleTime
                handleSearch={event => setSearchQuery(event.target.value)}
                categoryItems={categories}
                section={type}
              />
              <BukkaNavSmallScreen currentCategory="Wine Under $20" />
              <LocationNavSmallScreen />
              <div id="flyout-left-container">
                {categories.map(category => (
                  <Fragment key={shortId.generate()}>
                    <div className="carousel-divider" />
                    <Container classNames="px-0">
                      <div className="mt-4 mb-4">
                        <Headline title={category} activeIndex={1} />
                        <Container>
                          <Row classNames="pb-4">
                            {bukkaMenu.map(menu => (
                              <>
                                {menu.category === category &&
                                  menu.title
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) && (
                                    <BukkaCard
                                      key={shortId.generate()}
                                      imageUrl={menu.imageUrl}
                                      mealName={menu.title}
                                      deliveryPrice={menu.deliveryCost}
                                      imageHeight="fresh-img-height"
                                      classNames="col-lg-3 col-md-4 col-sm-6 col-6"
                                      dataTarget="#mealModal"
                                      dataToggle="modal"
                                      handleClick={() =>
                                        setMealToDisplay(menu.slug)
                                      }
                                    />
                                  )}
                              </>
                            ))}
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
  fetchBukkaMenuReducer: {
    bukkaMenu,
    categories,
    status: { error, fetched },
  },
  drinkReducer: {
    fetchedBukkas: { nearbyBukkas: drinkBukkas },
  },
  selectedLocationReducer: { coordinates },
  cartReducer: { errorMessage },
}) => ({
  bukkaMenu,
  status,
  coordinates,
  mode,
  drinkBukkas,
  categories,
  error,
  fetched,
  errorMessage,
});

export default connect(
  mapStateToProps,
  {
    fetchBukkaMenu: fetchBukkaMenuAction,
    setMealToDisplay: setMealToDisplayAction,
  },
)(OtherSection);

OtherSection.propTypes = {
  // mode: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
};
