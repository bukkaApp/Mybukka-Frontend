import React from 'react';

import PropTypes from 'prop-types';
import Checkout from './components/Checkout';

const checkoutPage = ({ history: { push } }) => <Checkout push={push} />;

export default checkoutPage;

checkoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};
