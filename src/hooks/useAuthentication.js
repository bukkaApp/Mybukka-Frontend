import { useMemo } from 'react';
import jwt from 'jsonwebtoken';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import swal from 'sweetalert';
import { useUserContext } from '../context/UserContext';
import useApi from '../shared/api';
import { useToastContext } from '../context/ToastContext';
import { useLoadingContext } from '../context/LoadingContext';
import { useModalContext } from '../context/ModalContext';

const useAuthentication = (pathname) => {
  const { push, location } = useHistory();

  const {
    logoutSuccess: signOut,
    signIn: signInData,
    setUser,
    setVerified,
    token,
    isAuthenticated,
  } = useUserContext();
  const { loading } = useLoadingContext();
  const { setVerificationPhonePopup, setModal } = useModalContext();
  const { API } = useApi();
  const { pathname: prevPage } = useLocation();
  const { setToast } = useToastContext();

  // Redirect to login when token expires
  const redirectToLogin = () => push('/login', { redirectTo: prevPage });

  const isExpiredToken = () => {
    const now = Date.now().valueOf() / 1000;
    const decoded = jwt.decode(token);
    if (!decoded) return true;
    if (decoded && typeof decoded.exp !== 'undefined' && decoded.exp < now)
      return true;
    if (decoded && typeof decoded.nbf !== 'undefined' && decoded.nbf > now)
      return true;
    return false;
  };

  const requestVerification = (hasVerified) => {
    if (hasVerified === false) {
      setVerificationPhonePopup(true);
      setModal(true);
    }
  };

  const signOutExpiredToken = async () => {
    if (token) return signOut();
    if (!signInData) {
      return swal('You need to login first').then(() => redirectToLogin());
    }
    setToast({ message: 'Retrying login ...', type: 'warning' });
    localStorage.removeItem('x-access-token');
    const { email } = (token && jwt.decode(token).data) || {};
    const password = signInData.split('.bukka@gmail.com')[0];
    try {
      loading(true);
      const response = await API.authToken.post({ email, password });
      loading(false);
      if (response.data.token) {
        setUser(response.data.user, response.data.token);
        localStorage.setItem('x-access-token', response.data.token);
        setVerified(response.data.user.verified);
        requestVerification(response.data.user.verified);
      }
    } catch (error) {
      loading(false);
      setToast({
        message: error.response ? error.response.data.message : error.message,
        type: 'error',
      });
    }
  };

  useMemo(() => {
    const pathMatch = matchPath(location.pathname, {
      path: pathname,
      exact: true,
    });

    if (pathMatch) {
      const expired = isExpiredToken();
      if (!expired) return;
      signOutExpiredToken(token);
    }
  }, [location, isAuthenticated, pathname]);
};

export default useAuthentication;
