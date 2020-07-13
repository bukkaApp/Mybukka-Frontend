import React, { Fragment, useEffect } from 'react';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import useHistory from '../../hooks/useHistory';
import { useLocationContext } from '../../context/LocationContext';
import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import useApi from '../../shared/api';
import { useBusinessesContext } from '../../context/BusinessesContext';
import { useLoadingContext } from '../../context/LoadingContext';

let fetched = { food: null, businessGroup: null, categories: null };

const Home = () => {
  const { push } = useHistory();
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { coordinates, locationChange } = useLocationContext();
  const { setBusinesses, setBusinessGroup, setBusinessCategories } = useBusinessesContext();

  useEffect(() => {
    if (!locationChange || coordinates.length <= 0) return;
    loading(true);
    const onResponse = (res, type, hasError = false) => {
      fetched[type] = true;
      const data = hasError ? (res.response.data || res) : res.data;
      if (type === 'food') setBusinesses(data, hasError);
      if (type === 'businessGroup') setBusinessGroup(data, hasError);
      if (type === 'categories') setBusinessCategories(data, hasError);
      if (fetched.food && fetched.businessGroup && fetched.categories) {
        push('/feed', { showMap: true, fetched: true });
      }
    };

    const getNearbyFoodBusiness = () => {
      API.businesses.get('type=food')
        .then(res => onResponse(res, 'food'))
        .catch((err) => {
          onResponse(err, 'food', true);
          if (locationChange) push('/coming-soon');
        });
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

    getNearbyFoodBusiness();
    getNearbyBusinessGroup();
    getNearbyBusinessCategory();

    return () => {
      fetched = { food: null, businessGroup: null, categories: null };
      loading(false);
    };
  }, [coordinates]);

  return (
    <Fragment>
      <div className="home">
        <IntroSection push={push} />
        <DiscoverSection />
        <ChooseAreaToExploreSection />
        <ReadyToOrderSection />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;

Home.defaultProps = {
  errorMessage: '',
};

Home.propTypes = {};
