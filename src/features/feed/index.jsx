import React from 'react';

import PropTypes from 'prop-types';

import Feed from './components';

const FeedPage = ({ history: { push }, ...props }) => (
  <>
    <Feed push={push} {...props} />
  </>
);

export default FeedPage;

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
