import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthenticaticatedNavbar from './AuthenticaticatedNavbar';
import PrimaryNavbar from './PrimaryNavbar';
import './navbar.scss';

const Navbar = (props) => {
  const { authenticated } = props.status;
  let AuthNavbar = <PrimaryNavbar {...props} />;
  if (authenticated) {
    AuthNavbar = <AuthenticaticatedNavbar {...props} />;
  }
  return (
    <AuthNavbar />
  );
};

const mapStateToProps = ({
  authenticationReducer: { status }
}) => ({
  status
});

export default connect(mapStateToProps, null)(Navbar);

Navbar.defaultProps = {
  status: { authenticated: false }
};

Navbar.propTypes = {
  status: PropTypes.objectOf(PropTypes.string)
};

