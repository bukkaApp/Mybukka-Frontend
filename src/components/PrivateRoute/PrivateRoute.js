import React from 'react';

import { Route } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { useUserContext } from '../../context/UserContext';

const PrivateRoute = (props) => {
  const { logoutSuccess: signOut, token, isAuthenticated } = useUserContext();
  useAuthentication(signOut, isAuthenticated, token);

  return <Route {...props} />;
};

export default PrivateRoute;
