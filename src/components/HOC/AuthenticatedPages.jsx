/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import authServices from 'Utilities/authServices';

const AuthenticatedPages = WrappedComponent => (props) => {
  const currentPage = props.location.pathname;
  if (!authServices.getToken() || !authServices.isValid(authServices.getToken()) || !props.authenticated) {
    props.signOut();
    swal('You need to login first');
    return <Redirect to={`/login?next=${currentPage}`} />;
  }
  return <WrappedComponent {...props} />;
};

export default AuthenticatedPages;
