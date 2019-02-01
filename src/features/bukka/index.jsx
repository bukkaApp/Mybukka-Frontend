import React from 'react';

import PropTypes from 'prop-types';

import Bukka from './components';

const Scene = ({ history: { push } }) => <Bukka push={push} />;

export default Scene;

Scene.defaultProps = {
  history: {
    push: () => {},
  }
};

Scene.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
