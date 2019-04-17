import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BannerSection from '../common/BannerSection';
import SupportMainSection from './SupportMainSection';

const SupportBuyer = ({ authenticated }) => (
  <div>
    <BannerSection />
    <SupportMainSection authenticated={authenticated} />
  </div>
);

const mapStateToProps = ({
  authenticationReducer: { status: { authenticated }, }
}) => ({
  authenticated,
});

export default connect(mapStateToProps)(SupportBuyer);

SupportBuyer.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
