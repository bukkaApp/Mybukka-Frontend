import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthModal from 'Components/navbar/common/AuthModal';
import Footer from 'Components/footer/Footer';
import fetchBukkas from '../feed/actionCreators/fetchBukkas';
import IntroSection from './components/IntroSection';
import DiscoverSection from './components/DiscoverSection';

import ChooseAreaToExploreSection
  from './components/ChooseAreaToExploreSection';

import ReadyToOrderSection from './components/ReadyToOrderSection';

import VerifyPhone from '../verifyPhone';

const Home = ({
  history: { push },
}) => (
  <Fragment>
    <AuthModal push={push} />
    <div className="home">
      <VerifyPhone />
      <IntroSection push={push} />
      <DiscoverSection />
      <ChooseAreaToExploreSection push={push} />
      <ReadyToOrderSection push={push} />
      <Footer />
    </div>
  </Fragment>
);

export default connect(
  () => ({}),
  { fetchNearbyBukkas: fetchBukkas },
)(Home);

Home.defaultProps = {
  errorMessage: '',
};

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
