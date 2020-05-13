/* eslint-disable react/prop-types */
import React from 'react';
import swal from 'sweetalert';
import authServices from 'Utilities/authServices';

const AuthenticatedPages = WrappedComponent => (props) => {
  const currentPage = props.location.pathname;
  if (!authServices.getToken() || !authServices.isValid(authServices.getToken()) || !props.authenticated) {
    props.signOut();
    swal('You need to login first')
      .then((okay) => {
        if (okay) {
          return this.props.history.push(`/login?next=${currentPage}`);
        }
      });
    // return <Redirect to={`/login?next=${currentPage}`} />;
  }
  return <WrappedComponent {...props} />;
};

export default AuthenticatedPages;
