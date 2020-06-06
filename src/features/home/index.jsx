import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import { useLocationContext } from '../../context/LocationContext';
import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import useUpdateEffect from '../../hooks/useUpdateEffect';
import useApi from '../../shared/api';
import { useBusinessesContext } from '../../context/BusinessesContext';

const fetched = { food: null, businessGroup: null, categories: null };

const Home = () => {
  const [hasMounted, setMounted] = useState(null);

  const { push } = useHistory();
  const { API } = useApi();
  const { coordinates, setCurrentLocation } = useLocationContext();
  const { setBusinesses, setBusinessGroup, setBusinessCategories } = useBusinessesContext();

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useUpdateEffect(() => {
    const setter = (res, type, hasError = false) => {
      fetched[type] = true;
      const data = hasError ? (res.response.data || res) : res.data;
      if (type === 'food') setBusinesses(data, hasError);
      if (type === 'businessGroup') setBusinessGroup(data, hasError);
      if (type === 'categories') setBusinessCategories(data, hasError);
      if (fetched.food && fetched.businessGroup && fetched.categories && hasMounted) {
        push('/feed', { showMap: true, fetched: true });
      }
    };

    const getNearbyFoodBusiness = () => {
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

    getNearbyFoodBusiness();
    getNearbyBusinessGroup();
    getNearbyBusinessCategory();
    setMounted(true);
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
