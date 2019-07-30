import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchBukkas from '../feed/actionCreators/fetchBukkas';
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
  errorMessage,
  message,
  status,
}) => {
  const [error, setError] = useState(false);

  useEffect(
    () => () => {
      fetchNearbyBukkas(coordinates);
    },
    [coordinates],
  );

  useEffect(() => {
    if (
      (errorMessage.length > 0 ||
        message === 'An error occurred' ||
        status.error) &&
      nearbyBukkas.length === 0
    ) {
      push('/not-found/bukkas');
    }
  }, [status.error]);

  useEffect(
    () => () => {
      nearbyBukkas.length > 0 ? push('/feed') : setError(!error);
    },
    [nearbyBukkas, error],
  );

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

const mapStateToProps = ({
  selectedLocationReducer: { coordinates },
  bukkasReducer: { fetchedBukkas, errorMessage, message, status },
}) => ({
  coordinates,
  fetchedBukkas,
  errorMessage,
  message,
  status,
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
};
