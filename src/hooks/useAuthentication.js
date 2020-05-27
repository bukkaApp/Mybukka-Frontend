import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import authServices from 'Utilities/authServices';
import swal from 'sweetalert';


const useAuthentication = (signOut, isAuthenticated, token) => {
  const history = useHistory();
  const { pathname: prevPage } = useLocation();

  const pageRedirect = (accepted) => {
    if (accepted) {
      return history.push('/login', { redirectTo: prevPage });
    }
  };

  const signOutExpiredToken = () => {
    if (token) signOut();
  };

  useEffect(() => {
    if (!token || !authServices.isValid(token)) {
      signOutExpiredToken(token);
      setTimeout(() => {
        swal('You need to login first')
          .then(accepted => pageRedirect(accepted));
      }, 2000);
    }
  }, [isAuthenticated]);
};

export default useAuthentication;
