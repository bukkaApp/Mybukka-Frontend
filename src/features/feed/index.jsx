import React from 'react';

import PropTypes from 'prop-types';

import Feed from './components/feed';

const FeedPage = ({ history: { push } }) => (
  <Feed push={push} />
);

export default FeedPage;

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
