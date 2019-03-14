import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthenticaticatedNavbar from './AuthenticaticatedNavbar';
import PrimaryNavbar from './PrimaryNavbar';
import BukkaAuthenticatedNav from './BukkaAuthenticatedNav';
import './navbar.scss';

const Navbar = (props) => {
  const { status: { authenticated }, bukka } = props;
  // default primary navbar
  let AuthNavbar = PrimaryNavbar;
  // Primary Authenticated navbar
  if (authenticated && !bukka) {
    AuthNavbar = AuthenticaticatedNavbar;
  } else if (bukka) {
  // bukka navbar with expected bukka prop to be true
    AuthNavbar = BukkaAuthenticatedNav;
  }
  return (
    <AuthNavbar {...props} />
  );
};

const mapStateToProps = ({
  authenticationReducer: { status }
}) => ({
  status,
});

export default connect(mapStateToProps, null)(Navbar);

Navbar.defaultProps = {
  status: { authenticated: false },
  bukka: false
};

Navbar.propTypes = {
  status: PropTypes.objectOf(PropTypes.bool),
  bukka: PropTypes.bool
};
