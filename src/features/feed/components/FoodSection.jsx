import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import LocationNavLargeScreen
  from 'Components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from 'Components/common-navs/LocationNavSmallScreen';

import ViewBusinessesOnMap from '../../../components/business-list/ViewBusinessesOnMap';
import BusinessList from '../../../components/business-list/BusinessList';
import BukkasToExploreSection from '../common/BukkasToExploreSection';
import { useLocationContext } from '../../../context/LocationContext';
import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';
import { foodBannerImage } from '../img/imgLinks';

import './FoodSection.scss';
import { useBusinessesContext } from '../../../context/BusinessesContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';


let fetched = { food: null, businessGroup: null, categories: null };

const FoodSection = () => {
  const { push } = useHistory();
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { businesses, setBusinesses, setBusinessGroup, setBusinessCategories } = useBusinessesContext();
  const { coordinates, updated, setUpdate } = useLocationContext();
  const [displayMap, setDisplayMap] = useState(false);

  useEffect(() => {
    setUpdate(null);
  }, []);

  useEffect(() => {
    if (coordinates.length < 2) push('/');
    if (!updated) return setUpdate(true);

    loading(true);

    const setter = (res, type, hasError = false) => {
      fetched[type] = true;
      const data = hasError ? (res.response.data || res) : res.data;
      if (type === 'food') setBusinesses(data, hasError);
      if (type === 'businessGroup') setBusinessGroup(data, hasError);
      if (type === 'categories') setBusinessCategories(data, hasError);
      if (fetched.food && fetched.businessGroup && fetched.categories) {
        loading(false);
      }
    };

    const getNearbyFoodBusinesses = () => {
      API.businesses.get('type=food')
        .then(res => setter(res, 'food'))
        .catch(() => push('/coming-soon'));
    };

    const getNearbyBusinessGroup = () => {
      API.businessGroup.get()
        .then(res => setter(res, 'businessGroup'))
        .catch(err => setter(err, 'businessGroup', true));
    };

    const getNearbyBusinessCategory = () => {
      API.businessCategories.get()
        .then(res => setter(res, 'categories'))
        .catch(err => setter(err, 'categories', true));
    };

    getNearbyFoodBusinesses();
    getNearbyBusinessGroup();
    getNearbyBusinessCategory();

    return () => {
      fetched = { food: null, businessGroup: null, categories: null };
      loading(false);
      setUpdate(null);
    };
  }, [coordinates]);

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {businesses && (
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
              {displayMap && <ViewBusinessesOnMap />}
              {!displayMap && <BusinessList />}
            </div>
          </ExploreSection>
        </div>
      )}
    </div>
  );
};

//  loadingReducer: { status: loading },
//  deliveryModeReducer: { mode },
//  businessesReducer: { fetchedBukkas, errorMessage },
//  promotionReducer: { fetchedBukkas: fetchedPromotedBukkas },
//  businessGroupReducer: { fetchedBukkas: fetchedCuisines }

export default FoodSection;

FoodSection.propTypes = {};
