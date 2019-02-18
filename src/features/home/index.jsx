import React from 'react';

import PropTypes from 'prop-types';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';
import ChooseAreaToExploreSection from './components/ChooseAreaToExploreSection';
import ReadyToOrderSection from './components/ReadyToOrderSection';

const Home = ({ history: { push } }) => (
  <div className="home">
    <IntroSection push={push} />
    <DiscoverSection />
    <ChooseAreaToExploreSection />
    <ReadyToOrderSection />
    <Footer />
  </div>
);

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};
