import React, { useEffect, useState, Fragment } from 'react';

import { useHistory, Route, Redirect, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';
import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen from 'Components/navbar/BukkaNavSmallScreen';
import CheckoutButton from 'Components/common/CheckoutButton';
import fetchFreshOrMartAction from 'Redux/fetchFreshOrMartAction';

import { useLocationContext } from '../../../context/LocationContext';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { drinkBannerImage, freshBannerImage } from '../img/imgLinks';
import OtherSectionCategories from '../common/OtherSectionCategories';

const OtherSection = ({
  bukkaMenu,
  categories,
  fetched,
  match,
  location,
  fetchNearbyFreshOrMart,
  error,
  loading
}) => {
  const prevPage = React.useRef(null);
  const { params } = matchPath(location.pathname, { path: '/:id' });
  const type = params.id;
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const isMart = type === 'mart';

  useEffect(() => {
    window.scrollTo(0, 0);
    const _refetchItems = () => {
      const hasntFetched = !loading && bukkaMenu.length === 1;
      const validCoordinatesAndNoError = coordinates.length !== 0 && !error;
      const pageChanged = !prevPage.current || prevPage.current !== type;
      if (pageChanged && hasntFetched && validCoordinatesAndNoError) {
        prevPage.current = type;
        fetchNearbyFreshOrMart(coordinates, type);
      }
    };
    _refetchItems();
  }, [coordinates, type]);

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      <Route
        path={`${match.path}`}
        render={() => (
          bukkaMenu.length < 2 && fetched ?
            <Redirect to="/coming-soon" />
            : <Fragment>
              <IntroSection push={push} />
              <ExploreSection>
                <AreasToExplore
                  text={isMart ? 'Mart' : 'Groceries.'}
                  bgImage={isMart ? drinkBannerImage : freshBannerImage}
                />
                <div className="feed-main-content">
                  <LocationNavLargeScreen
                    scheduleTime
                    handleSearch={event => setSearchQuery(event.target.value)}
                    categoryItems={categories}
                    section={type}
                  />
                  <BukkaNavSmallScreen currentCategory="Wine Under $20" />
                  <LocationNavSmallScreen />
                  <OtherSectionCategories searchQuery={searchQuery} />
                </div>
              </ExploreSection>
            </Fragment>)}
      />
      <CheckoutButton />
      <UnAuthenticatedCheckout push={push} />
    </div>
  );
};

const mapStateToProps = ({
  productsReducer: {
    bukkaMenu,
    categories,
    status: { error, fetched },
  },
  loadingReducer: { status: loading },
  cartReducer: { errorMessage },
}) => ({
  loading,
  bukkaMenu,
  status,
  categories,
  error,
  fetched,
  errorMessage,
});

export default connect(
  mapStateToProps,
  {
    fetchNearbyFreshOrMart: fetchFreshOrMartAction
  },
)(OtherSection);

OtherSection.propTypes = {};
