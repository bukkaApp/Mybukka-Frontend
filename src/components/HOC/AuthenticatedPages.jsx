import React from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const AuthenticatedPages = WrappedComponent => (props) => {
  if (!props.authenticated) {
    swal('You need to login first');
    return <Redirect to="/login" />;
  }
  return <WrappedComponent {...props} />;
};

export default AuthenticatedPages;
