import React from 'react';

import PropTypes from 'prop-types';
import AuthenticaticatedNavbar from './AuthenticaticatedNavbar';
import PrimaryNavbar from './PrimaryNavbar';
import BukkaAuthenticatedNav from './BukkaAuthenticatedNav';

import './navbar.scss';
import { useUserContext } from '../../context/UserContext';

const Navbar = (props) => {
  const { isAuthenticated } = useUserContext();
  const { bukka } = props;
  // default primary navbar
  let AuthNavbar = PrimaryNavbar;
  // Primary Authenticated navbar
  if (isAuthenticated && !bukka) {
    AuthNavbar = AuthenticaticatedNavbar;
  } else if (bukka) {
  // bukka navbar with expected bukka prop to be true
    AuthNavbar = BukkaAuthenticatedNav;
  }
  return (
    <AuthNavbar {...props} />
  );
};

export default Navbar;

Navbar.defaultProps = { bukka: false };

Navbar.propTypes = { bukka: PropTypes.bool };
