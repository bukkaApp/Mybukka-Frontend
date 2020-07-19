import React, { useEffect, useMemo } from 'react';

import { Route } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import { useToastContext } from '../../context/ToastContext';
import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';

const PrivateRoute = (props) => {
  const { token, } = useUserContext();

  const { payment, setAddress, setCard, setProfile } = useUserContext();
  const { loading } = useLoadingContext();
  const { setPaymentSecurityPopup, setPaymentPendingPopup, setPaymentGatewayPopup, setModal } = useModalContext();
  const { setToast } = useToastContext();
  const { API } = useApi();

  const tryCatch = async (apiCall, successHandler, showError, errorHandler) => {
    try {
      const response = await apiCall();
      if (successHandler) successHandler(response.data);
    } catch (error) {
      if (errorHandler) errorHandler(null);
      if (showError && error.response && error.response.status === 404) setToast({ message: error.response.data.message, type: 'error' });
      loading(false);
    }
  };

  const handlePaymentContinuation = () => {
    setModal(true);
    const status = (payment && payment.status) || '';
    const activeStatus = status.split('send_').join('');
    if (activeStatus === 'pending') {
      return setPaymentPendingPopup(true);
    } else if (activeStatus === 'url') {
      return setPaymentGatewayPopup(true);
    } else if (payment && activeStatus !== 'failed' && status !== '') {
      setPaymentSecurityPopup(true);
    }
  };

  useAuthentication(props.path);

  useEffect(() => {
    if (payment && payment.status !== '') handlePaymentContinuation();
  }, [payment]);

  useMemo(() => {
    if (!token) return;
    const getUser = () => tryCatch(API.profile.get, res => setProfile(res.userInfo));
    const getAddress = () => tryCatch(API.address.get, res => setAddress(res.foundAddress), true, setAddress);
    const getPaymentCard = () => tryCatch(API.card.get, res => setCard(res.foundCard), true, setCard);
    loading(true);
    getUser();
    getAddress();
    getPaymentCard();
    loading(false);
  }, [token]);

  return <Route {...props} />;
};

export default PrivateRoute;
