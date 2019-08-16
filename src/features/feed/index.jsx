import React from 'react';

import PropTypes from 'prop-types';

import ModalRoot from '../modal-root/Index';
import Feed from './components';

const FeedPage = ({ history: { push }, ...props }) => (
  <>
    <ModalRoot push={push} />
    <Feed push={push} {...props} />
  </>
);

export default FeedPage;

FeedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
