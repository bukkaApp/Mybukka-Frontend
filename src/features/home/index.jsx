import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import ChooseAreaToExploreSection from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

const Home = ({ history: { push }, coordinates }) => {
  // useEffect(() => () => push('/feed'), [coordinates]);

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
