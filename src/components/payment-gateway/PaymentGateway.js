import React, { useEffect, useState } from 'react';

import Iframe from 'react-iframe';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';

import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';

const defaultState = { reference: '', status: '', url: '', display_text: '', text: '' };

// handles redirections to bank url
const PaymentGateway = () => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { payment, setPayment, setCard } = useUserContext();
  const [state, setState] = useState({ reference: '', status: '', url: '', display_text: '', text: '' });
  const { setPaymentPendingPopup, paymentGatewayPopup, paymentPendingPopup, paymentSecurityPopup, setPaymentGatewayPopup, setPaymentSecurityPopup, setModal } = useModalContext();

  const requestSecurityVerification = (type) => {
    if (type !== '' && type !== 'url' && type !== 'pending' && type !== 'failed' && !paymentSecurityPopup) {
      setPaymentSecurityPopup(true);
      setPaymentGatewayPopup(false);
    } else if (type === 'pending' && !paymentPendingPopup) {
      setPaymentGatewayPopup(false);
      setPaymentPendingPopup(true);
    }
  };

  useEffect(() => {
    const text = payment ? payment.status.split('send_').join('') : '';
    requestSecurityVerification(text);
    setState({ ...state, ...defaultState, ...payment, text });
  }, [payment]);

  const handleClick = (incl) => {
    if (incl) setPayment(null);
    setModal(false);
    setPaymentGatewayPopup(false);
  };

  const saveCardAndClosePopup = (response) => {
    setCard(response.data.newCard);
    setPayment(null);
    loading('PAYMENT', false);
    handleClick();
  };

  const handleSubmit = async () => {
    try {
      loading('PAYMENT', true);
      const response = await API.card.get(state.reference);
      if (response.status === 201) return saveCardAndClosePopup(response);
      setPayment({ ...payment, ...response.data.data });
      loading('PAYMENT', false);
    } catch (error) {
      loading('PAYMENT', false);
    }
  };

  return (
    <Modal onClickOut={() => {}} show={paymentGatewayPopup} bodyClassName="FullWidth">
      <div onDoubleClick={() => handleClick(true)} className="text-end">
        <DismissModal onClick={handleSubmit} />
      </div>
      <Iframe
        url={state.url || 'https://standard.paystack.co/close'}
        position="relative"
        width="100%"
        id="myId"
        frameBorder="0"
        className="myClassname"
        height="100%"
      />
    </Modal>
  );
};

export default PaymentGateway;
