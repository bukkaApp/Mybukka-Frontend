import React, { useEffect, useState } from 'react';

import { useHistory, Route, Redirect, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';
import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen from 'Components/navbar/BukkaNavSmallScreen';
import CheckoutButton from 'Components/common/CheckoutButton';
import fetchBukkaMenuAction from 'Redux/fetchBukkaMenuAction';

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
  // error,
  fetched,
  fetchNearbyBukkas,
  match,
  location,
}) => {
  const { params } = matchPath(location.pathname, { path: '/:id' });
  const type = params.id;
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const isMart = type === 'mart';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNearbyBukkas(coordinates, type);
  }, [coordinates, type]);

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      <Route
        path={`${match.path}`}
        render={() => (bukkaMenu.length > 1 && fetched ? <div>
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
        </div> : <Redirect to="/coming-soon" />)}
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
  cartReducer: { errorMessage },
}) => ({
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
    fetchBukkaMenu: fetchBukkaMenuAction,
    fetchNearbyBukkas: fetchFreshOrMartAction
  },
)(OtherSection);

OtherSection.propTypes = {};
