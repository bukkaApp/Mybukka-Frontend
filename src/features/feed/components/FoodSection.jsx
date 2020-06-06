import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import NoNearByBukkaLocation
  from 'Components/not-found/NoNearByBukkaLocation';
import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';

import DesktopViewStoreOnMap from './DesktopViewStoreOnMap';
import MobileViewStoreOnMap from './MobileViewStoreOnMap';
import BukkasToExploreSection from '../common/BukkasToExploreSection';
import { useLocationContext } from '../../../context/LocationContext';
import fetchBukkas from '../actionCreators/fetchBukkas';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import { foodBannerImage } from '../img/imgLinks';

import getPromotedBukkas from '../actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../actionCreators/getRestaurantCuisineAction';
import './FoodSection.scss';

const FoodSection = ({
  fetchedBukkas: { nearbyBukkas },
  fetchNearbyBukkas,
  errorMessage,
  loading,
  getPromoBukkas,
  getRestaurantCuisine,
}) => {
  const { push } = useHistory();
  const { coordinates } = useLocationContext();
  const [displayMap, setDisplayMap] = useState(false);

  useEffect(() => {
    if (coordinates.length < 2) {
      push('/');
    }
  }, [coordinates]);

  useEffect(() => {
    const __refetchItems = () => {
      const hasntFetched = nearbyBukkas.length === 0 && !errorMessage;
      const hasLoadedValidCoordinates = !loading && coordinates.length !== 0;
      if (hasntFetched && hasLoadedValidCoordinates) {
        new Promise((resolve) => {
          resolve(getPromoBukkas(coordinates));
        }).then(() => fetchNearbyBukkas(coordinates))
          .then(() => getRestaurantCuisine(coordinates));
      }
    };
    __refetchItems();
  }, [nearbyBukkas]);

  const hasFetchedButEmpty = nearbyBukkas.length === 0 && errorMessage;
  const hasLoadedValidCoordinates = !loading && coordinates.length !== 0;
  if (hasFetchedButEmpty && hasLoadedValidCoordinates) {
    return <NoNearByBukkaLocation history={{ push }} />;
  }

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {nearbyBukkas.length > 0 && (
        <div>
          <IntroSection push={push} />
          <ExploreSection>
            <div className={displayMap ? 'd-none' : ''}>
              <AreasToExplore bgImage={foodBannerImage} />
            </div>
            <div className={displayMap ? 'feed-main-content-map' : 'feed-main-content'}>
              <LocationNavLargeScreen handleMapClick={() => setDisplayMap(!displayMap)} />
              <LocationNavSmallScreen />
              <BukkasToExploreSection displayMap={displayMap} />
              <section className={displayMap ? 'Food-Map-Container' : 'container px-0'}>
                <DesktopViewStoreOnMap displayMap={displayMap} />
                <MobileViewStoreOnMap displayMap={displayMap} />
              </section>
            </div>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  loadingReducer: { status: loading },
  deliveryModeReducer: { mode },
  businessesReducer: { fetchedBukkas, errorMessage },
  promotionReducer: { fetchedBukkas: fetchedPromotedBukkas },
  businessGroupReducer: { fetchedBukkas: fetchedCuisines }
}) => ({
  fetchedBukkas,
  fetchedCuisines,
  fetchedPromotedBukkas,
  mode,
  errorMessage,
  loading,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas,
    getPromoBukkas: getPromotedBukkas,
    getRestaurantCuisine: getRestaurantCuisineAction
  },
)(FoodSection);

FoodSection.propTypes = {
  fetchedBukkas: PropTypes.shape({
    nearbyBukkas: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
};
