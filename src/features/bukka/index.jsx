import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchBukkaAction from 'Redux/fetchBukkaAction';
import fetchBukkaMenuAction from '../../redux/fetchBukkaMenuAction';

import Bukka from './components';

const Scene = ({ history: { location, push }, fetchBukka, fetchBukkaMenu }) => {
  useEffect(() => {
    const bukkaToFetch = location.pathname.split('/')[2];
    fetchBukka(bukkaToFetch);
    fetchBukkaMenu(bukkaToFetch);
  });

  return <Bukka push={push} />;
};

export default connect(
  () => ({}),
  { fetchBukka: fetchBukkaAction, fetchBukkaMenu: fetchBukkaMenuAction }
)(Scene);

Scene.defaultProps = {
  history: {
    push: () => {}
  }
};

Scene.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  fetchBukka: PropTypes.func.isRequired,
  fetchBukkaMenu: PropTypes.func.isRequired,
};
