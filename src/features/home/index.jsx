import React from 'react';

import Footer from 'Components/footer/Footer';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';
import ChooseAreaToExploreSection from './components/ChooseAreaToExploreSection';
import ReadyToOrderSection from './components/ReadyToOrderSection';

const Home = () => (
  <div className="home">
    <IntroSection />
    <DiscoverSection />
    <ChooseAreaToExploreSection />
    <ReadyToOrderSection />
    <Footer />
  </div>
);

export default Home;
