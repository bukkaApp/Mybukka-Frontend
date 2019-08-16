import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import logOut from 'Components/navbar/actionCreators/logOut';
import AuthenticatedPages from 'Components/HOC/AuthenticatedPages';

import PropTypes from 'prop-types';
import ModalRoot from '../modal-root/Index';
import Checkout from './components/Checkout';

const checkoutPage = ({ history: { push } }) => (
  <Fragment>
    <ModalRoot push={push} />
    <Checkout push={push} />
  </Fragment>
);

const mapStateToProps = ({
  authenticationReducer: {
    status: { authenticated }
  }
}) => ({
  authenticated
});

export default connect(mapStateToProps,
  { signOut: logOut }
)(AuthenticatedPages(checkoutPage));

checkoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};
