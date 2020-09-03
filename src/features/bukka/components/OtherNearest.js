import React, { Fragment, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Carousel from '../../../components/Carousel/Carousel';
import Container from '../../../components/container/Container';
import ChooseAreaToExploreSection from '../../home/components/ChooseAreaToExploreSection';

import './bukkaScene.scss';
import './OtherNearest.scss';

import { useBusinessesContext } from '../../../context/BusinessesContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';
import { useLocationContext } from '../../../context/LocationContext';

// TODO: search database by majorcuise

let fetched = { food: null, businessGroup: null, categories: null };
// let justMounted = false;

const OtherNearest = () => {
  const { push } = useHistory();
  const { API } = useApi();
  const justMounted = React.useRef(null);
  const { loading } = useLoadingContext();
  const { coordinates, } = useLocationContext();
  const { setBusinesses, setBusinessGroup, setBusinessCategories, suggestedBusinesses } = useBusinessesContext();

  useEffect(() => {
    if (!justMounted.current) {
      justMounted.current = true;
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
        push('/feed', { showMap: true, fetched: true });
      }
    };

    const getNearbyFoodBusiness = () => {
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

    getNearbyFoodBusiness();
    getNearbyBusinessGroup();
    getNearbyBusinessCategory();

    return () => {
      fetched = { food: null, businessGroup: null, categories: null };
      loading(false);
      justMounted.current = null;
    };
  }, [coordinates]);

  const renameCategory = name => (
    name.toLowerCase() === 'new' ?
      'New on Bukka' : name
  );

  return (
    <Fragment>
      <div className="border-top" />
      <Container classNames="position-relative bg-white Other-Nearest">
        {suggestedBusinesses &&
        <Carousel
          container="container-padding"
          delivery
          noOfImagesShown={3}
          xl={3}
          lg={2}
          md={2}
          sm={1}
          push={push}
          description={'Other Item'}
          numberOfViews={suggestedBusinesses.length}
          title={renameCategory('Other Nearby Catelogs')}
          slideItems={suggestedBusinesses}
          controlClassNames="custom-mt-minus22"
          imageHeight="img-fluid"
          classNames="col-xl-4 col-md-6 col-sm-11 col-11"
        />}
        <ChooseAreaToExploreSection />
      </Container>
    </Fragment>
  );
};

export default OtherNearest;
