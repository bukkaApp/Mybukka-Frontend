import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import LocationNavLargeScreen
  from '../../../components/common-navs/LocationNavLargeScreen';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from '../../../components/common-navs/LocationNavSmallScreen';

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
let justMounted = false;

const FoodSection = () => {
  const { push } = useHistory();
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { businesses, setBusinesses, setBusinessGroup, setBusinessCategories } = useBusinessesContext();
  const { coordinates } = useLocationContext();
  const [displayMap, setDisplayMap] = useState(false);

  useEffect(() => {
    if (coordinates.length < 2) push('/');

    if (!justMounted && businesses) {
      justMounted = true;
      return justMounted;
    }

    loading(true);

    const onResponse = (res, type, hasError = false) => {
      fetched[type] = true;
      const data = hasError ? (res.response.data || res) : res.data;
      if (type === 'food') setBusinesses(data, hasError);
      if (type === 'businessGroup') setBusinessGroup(data, hasError);
      if (type === 'categories') setBusinessCategories(data, hasError);
      if (fetched.food && fetched.businessGroup && fetched.categories) {
        fetched = { food: null, businessGroup: null, categories: null };
        loading(false);
      }
    };

    const getNearbyFoodBusinesses = () => {
      API.businesses.get('type=food')
        .then(res => onResponse(res, 'food'))
        .catch(() => push('/coming-soon'));
    };

    const getNearbyBusinessGroup = () => {
      API.businessGroup.get()
        .then(res => onResponse(res, 'businessGroup'))
        .catch(err => onResponse(err, 'businessGroup', true));
    };

    const getNearbyBusinessCategory = () => {
      API.businessCategories.get()
        .then(res => onResponse(res, 'categories'))
        .catch(err => onResponse(err, 'categories', true));
    };

    getNearbyFoodBusinesses();
    getNearbyBusinessGroup();
    getNearbyBusinessCategory();

    return () => {
      justMounted = false;
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

export default FoodSection;

FoodSection.propTypes = {};
