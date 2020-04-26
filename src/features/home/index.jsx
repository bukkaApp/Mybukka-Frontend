import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from 'Components/footer/Footer';
import ModalRoot from '../modal-root/Index';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import { useLocationContext } from '../../context/LocationContext';
import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import VerifyPhone from '../verifyPhone';
import useDocumentTitle from '../../context/useDocumentTitle';
import fetchBukkasAction from '../feed/actionCreators/fetchBukkas';
import getPromotedBukkasAction from '../feed/actionCreators/getPromotedBukkas';
import getRestaurantCuisineAction from '../feed/actionCreators/getRestaurantCuisineAction';
import useUpdateEffect from '../../context/useUpdateEffect';


const Home = ({
  history: { push },
  fetchNearbyBukkas,
  getPromotedBukkas,
  getRestaurantCuisine,
}) => {
  useDocumentTitle('Welcome to bukka');
  const { coordinates } = useLocationContext();

  useUpdateEffect(() => {
    new Promise((resolve) => {
      resolve(getPromotedBukkas(coordinates));
    }).then(() => getRestaurantCuisine(coordinates))
      .then(() => fetchNearbyBukkas(coordinates))
      .then(() => push('/feed'));
    return () => console.log('unmounted');
  }, [coordinates]);

  return (
    <Fragment>
      <ModalRoot push={push} />
      <div className="home">
        <VerifyPhone />
        <IntroSection push={push} />
        <DiscoverSection />
        <ChooseAreaToExploreSection />
        <ReadyToOrderSection />
        <Footer />
      </div>
    </Fragment>
  );
};
export default connect(
  () => ({}),
  {
    fetchNearbyBukkas: fetchBukkasAction,
    getPromotedBukkas: getPromotedBukkasAction,
    getRestaurantCuisine: getRestaurantCuisineAction
  },
)(Home);

Home.defaultProps = {
  errorMessage: '',
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  getPromotedBukkas: PropTypes.func.isRequired,
  getRestaurantCuisine: PropTypes.func.isRequired,
};
