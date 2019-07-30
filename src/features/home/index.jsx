import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import ChooseAreaToExploreSection from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

const Home = ({
  history: { push },
  coordinates,
  fetchNearbyBukkas,
  fetchedBukkas: { nearbyBukkas },
}) => {
  useEffect(
    () => () => {
      console.log('about to fetch bukkas ...');
      fetchNearbyBukkas(coordinates);
    },
    [coordinates],
  );

  useEffect(() => () => {
    push('/feed');
  }, [nearbyBukkas]);

  return (
    <div className="home">
      <IntroSection push={push} />
      <DiscoverSection />
      <ChooseAreaToExploreSection />
      <ReadyToOrderSection />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ selectedLocationReducer: { coordinates } }) => ({
  coordinates
});

export default connect(
  mapStateToProps,
  null
)(Home);

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};
