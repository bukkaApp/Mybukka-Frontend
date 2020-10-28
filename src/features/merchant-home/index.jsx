import React, { Fragment, useEffect } from 'react';

import Footer from 'Components/footer/Footer';

import useHistory from '../../hooks/useHistory';
import { useLocationContext } from '../../context/LocationContext';

import useApi from '../../shared/api';
import { useBusinessesContext } from '../../context/BusinessesContext';
import { useLoadingContext } from '../../context/LoadingContext';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import SectionOne from './component/section-1';
import SectionTwo from './component/section-2';
import SectionThree from './component/section-3';
import SectionFour from './component/section-4';
import SectionFive from './component/section-5';

let fetched = { food: null, businessGroup: null, categories: null };
let successful = false;

const MerchantHome = () => {
    const { push } = useHistory();
    const { API } = useApi();
    const { loading } = useLoadingContext();
    const { coordinates, setLocationChange } = useLocationContext();
    const { setBusinesses, setBusinessGroup, setBusinessCategories } = useBusinessesContext();
  
    useUpdateEffect(() => {
      if (coordinates.length <= 0) return;
      const onResponse = (res, type, hasError = false) => {
        fetched[type] = true;
        const errHandler = err => (err.response ? err.response : err);
        const data = hasError ? errHandler(res) : res.data;
        if (type === 'food') setBusinesses(data, hasError);
        if (type === 'businessGroup') setBusinessGroup(data, hasError);
        if (type === 'categories') setBusinessCategories(data, hasError);
        if (fetched.food && fetched.businessGroup && fetched.categories) {
          loading(false);
          if (successful) return push('/feed', { showMap: true, fetched: true });
          return push('/coming-soon');
        }
        setLocationChange(true);
      };
  
      const getNearbyFoodBusiness = () => {
        API.businesses.get('type=food')
          .then((res) => {
            successful = true;
            onResponse(res, 'food');
          })
          .catch(err => onResponse(err, 'food', true));
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
  
      loading(true);
      getNearbyFoodBusiness();
      getNearbyBusinessGroup();
      getNearbyBusinessCategory();
  
      return () => {
        fetched = { food: null, businessGroup: null, categories: null };
        loading(false);
        setLocationChange(false);
      };
    }, [coordinates]);
  
    return (
      <Fragment>
            <div className="home">
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          <SectionFive />

          <Footer />
        </div>
      </Fragment>
    );
  };
  
  export default MerchantHome;
  
  MerchantHome.defaultProps = {
    errorMessage: '',
  };
  
  MerchantHome.propTypes = {};