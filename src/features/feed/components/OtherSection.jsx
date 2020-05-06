import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import UnAuthenticatedCheckout from 'Components/common-navs/UnAuthenticatedCheckout';
import LocationNavLargeScreen from 'Components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen from 'Components/navbar/BukkaNavSmallScreen';
import CheckoutButton from 'Components/common/CheckoutButton';
import NoNearByBukkaLocation from 'Components/not-found/NoNearByBukkaLocation';
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
  error,
  fetched,
  type,
  fetchNearbyBukkas,
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const isMart = type === 'mart';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNearbyBukkas(coordinates, type);
  }, [coordinates, type]);

  if (bukkaMenu.length === 1 && error) {
    return <NoNearByBukkaLocation push={push} />;
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {bukkaMenu.length > 1 && fetched && (
        <div>
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
        </div>
      )}
      <CheckoutButton />
      <UnAuthenticatedCheckout push={push} />
    </div>
  );
};

const mapStateToProps = ({
  fetchBukkaMenuReducer: {
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
