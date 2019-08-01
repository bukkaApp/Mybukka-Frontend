import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchBukkas from '../feed/actionCreators/fetchBukkas';
import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import ChooseAreaToExploreSection from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import VerifyPhone from '../verifyPhone';

const Home = ({
  history: { push },
  coordinates,
  fetchNearbyBukkas,
  fetchedBukkas: { nearbyBukkas },
  errorMessage,
}) => {
  useEffect(() => () => scrollTo(0, 0), []);

  useEffect(
    () => () => {
      fetchNearbyBukkas({ coordinates });
    },
    [coordinates],
  );

  useEffect(() => {
    if (!errorMessage && nearbyBukkas.length > 0) {
      return push('/feed');
    } else if (errorMessage && nearbyBukkas.length <= 0) {
      return push('/coming-soon');
    }
  }, [errorMessage, nearbyBukkas]);

  return (
    <div className="home">
      <VerifyPhone />
      <IntroSection push={push} />
      <DiscoverSection />
      <ChooseAreaToExploreSection />
      <ReadyToOrderSection />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({
  selectedLocationReducer: { coordinates },
  bukkasReducer: { fetchedBukkas, errorMessage },
}) => ({
  coordinates,
  fetchedBukkas,
  errorMessage,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas },
)(Home);

Home.defaultProps = {
  errorMessage: ''
};

Home.propTypes = {
  errorMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};
