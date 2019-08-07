import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from 'Components/footer/Footer';
import fetchBukkas from '../feed/actionCreators/fetchBukkas';
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
}) => {
  useEffect(
    () => () => {
      fetchNearbyBukkas(coordinates);
    },
    [coordinates],
  );

  useEffect(() => () => push('/feed'), [nearbyBukkas]);

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
  bukkasReducer: { fetchedBukkas },
}) => ({
  coordinates,
  fetchedBukkas,
});

export default connect(
  mapStateToProps,
  { fetchNearbyBukkas: fetchBukkas },
)(Home);

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  fetchNearbyBukkas: PropTypes.func.isRequired,
  fetchedBukkas: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])).isRequired
};
