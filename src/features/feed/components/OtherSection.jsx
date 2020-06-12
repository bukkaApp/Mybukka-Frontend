import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, matchPath } from 'react-router-dom';

import UnAuthenticatedCheckout from '../../../components/cart/UnAuthenticatedCheckout';
import LocationNavLargeScreen from '../../../components/common-navs/LocationNavLarge';
import LocationNavSmallScreen, {
  SelectLocationModal,
} from '../../../components/common-navs/LocationNavSmallScreen';
import BukkaNavSmallScreen from '../../../components/navbar/BukkaNavSmallScreen';
import CheckoutButtonOnSmallScreen from '../../../components/common/CheckoutButton';

import { useLocationContext } from '../../../context/LocationContext';
import { useBusinessContext } from '../../../context/BusinessContext';
import useApi from '../../../shared/api';
import { useLoadingContext } from '../../../context/LoadingContext';

import IntroSection from '../common/IntroSection';
import AreasToExplore from '../common/AreasToExplore';
import ExploreSection from '../common/ExploreSection';

import { drinkBannerImage, freshBannerImage } from '../img/imgLinks';
import OtherSectionCategories from '../common/OtherSectionCategories';

const OtherSection = ({
  location,
  history,
}) => {
  const { API } = useApi();
  const [uniqueCatelogs, setUniqueCatelogs] = useState([]);

  const { params } = matchPath(location.pathname, { path: '/:id' });
  const type = params.id;
  const { push } = useHistory();
  const { loading } = useLoadingContext();
  const { setBusiness, setCatelogs, catelogs } = useBusinessContext();
  const { coordinates } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const isMart = type === 'mart';

  useEffect(() => {
    if (catelogs) {
      const categories = [...new Set(catelogs.map(catelog => catelog.category))];
      setUniqueCatelogs(categories);
    }
  }, [catelogs]);


  useEffect(() => {
    window.scrollTo(0, 0);

    if (coordinates.length < 2) return history.push('/');

    loading(true);

    const onResponse = (res, hasError = false) => {
      loading(false);
      const data = hasError ? (res.response.data || res) : res.data;
      setCatelogs(data, hasError);
      setBusiness(data, hasError);
      if (hasError) history.push('/coming-soon');
    };

    const getBusinessInformationAndCatelogs = () => {
      API.businesses.get(`type=${type}`)
        .then(res => onResponse(res))
        .catch(err => onResponse(err, true));
    };

    getBusinessInformationAndCatelogs();
  }, [coordinates, type]);

  // useEffect(() => {
  //   if (errorMessage !== '') {
  //     swal({ text: errorMessage, icon: 'warning', dangerMode: true });
  //   }
  // }, [errorMessage]);

  const isInSearch = (catelog) => {
    if (catelog) {
      return catelog.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  };

  const hasNoResult = () => catelogs.filter(menu => isInSearch(menu)).length === 0;

  return (
    <div className="container-fluid p-0">
      <SelectLocationModal />
      {catelogs &&
        <Fragment>
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
                categoryItems={uniqueCatelogs}
                section={type}
              />
              <BukkaNavSmallScreen currentCategory="Wine Under $20" />
              <LocationNavSmallScreen />
              <OtherSectionCategories
                isInSearch={isInSearch}
                hasNoResult={hasNoResult}
                searchQuery={searchQuery}
                uniqueCatelogs={uniqueCatelogs}
              />
            </div>
          </ExploreSection>
          <CheckoutButtonOnSmallScreen />
          <UnAuthenticatedCheckout push={push} />
        </Fragment>}
    </div>
  );
};


export default OtherSection;

OtherSection.propTypes = {};
