import React from 'react';

import PropTypes from 'prop-types';

import AuthModal from 'Components/navbar/common/AuthModal';
import Feed from './components';

const FeedPage = ({ history: { push }, ...props }) => (
  <>
    <AuthModal push={push} />
    <Feed push={push} {...props} />
  </>
);

export default FeedPage;

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
