import React from 'react';

import { connect } from 'react-redux';

import logOut from 'Components/navbar/actionCreators/logOut';
import AuthenticatedPages from 'Components/HOC/AuthenticatedPages';

import PropTypes from 'prop-types';
import Checkout from './components/Checkout';

const checkoutPage = ({ history: { push, location } }) => <Checkout push={push} />;

const mapStateToProps = ({
  authenticationReducer: {
    status: { authenticated }
  }
}) => ({
  authenticated
});

export default connect(mapStateToProps, { signOut: logOut })(AuthenticatedPages(checkoutPage));

checkoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};
