import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { useUserContext } from '../context/UserContext';
import useApi from '../shared/api';
import { useToastContext } from '../context/ToastContext';
import { useLoadingContext } from '../context/LoadingContext';
import { useModalContext } from '../context/ModalContext';


const useAuthentication = (signOut, isAuthenticated, token) => {
  const history = useHistory();
  const { signIn: signInData, setUser, setVerified } = useUserContext();
  const { loading } = useLoadingContext();
  const { setVerificationPhonePopup, setModal } = useModalContext();
  const { API } = useApi();
  const { pathname: prevPage } = useLocation();
  const { setToast } = useToastContext();

  const pageRedirect = () => history.push('/login', { redirectTo: prevPage });

  const isExpiredToken = () => {
    const now = Date.now().valueOf() / 1000;
    const decoded = jwt.decode(token);
    if (!decoded) return true;
    if (decoded && typeof decoded.exp !== 'undefined' && decoded.exp < now) return true;
    if (decoded && typeof decoded.nbf !== 'undefined' && decoded.nbf > now) return true;
    return false;
  };

  const requestVerification = (hasVerified) => {
    if (hasVerified === false) {
      setVerificationPhonePopup(true);
      setModal(true);
    }
  };

  const signOutExpiredToken = async () => {
    if (!(signInData && token)) return signOut();
    setToast({ message: 'Retrying login ...', type: 'warning' });
    const { email } = (token && jwt.decode(token).data) || {};
    const password = signInData.split('.bukka@gmail.com')[0];
    try {
      loading(true);
      const response = await API.authToken.post({ email, password });
      loading(false);
      if (response.data.token) {
        setUser(response.data.user, response.data.token);
        setVerified(response.data.user.verified);
        requestVerification(response.data.user.verified);
      }
    } catch (error) {
      loading(false);
      setToast({ message: error.response ? error.response.data.message : error.message, type: 'error' });
    }
  };

  useEffect(() => {
    const expired = isExpiredToken();
    if (!expired) return;
    signOutExpiredToken(token);
    if (!(signInData && token)) swal('You need to login first').then(() => pageRedirect());
  }, [isAuthenticated]);
};

export default useAuthentication;
