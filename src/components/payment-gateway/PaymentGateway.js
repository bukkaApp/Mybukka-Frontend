import React, { useEffect, useState, useRef } from 'react';

import Iframe from 'react-iframe';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import io from 'socket.io-client';

import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';

const defaultState = {
  reference: '',
  status: '',
  url: '',
  display_text: '',
  text: '',
};

let socket;
// const to = 'http://localhost:1234/';
const to = 'https://mybukka-backend.herokuapp.com/';

// handles redirections to bank url
const PaymentGateway = () => {
  const [openUrl, setOpenUrl] = useState(false);

  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { payment, setPayment, setCard } = useUserContext();
  const [state, setState] = useState({
    reference: '',
    status: '',
    url: '',
    display_text: '',
    text: '',
  });
  const {
    setPaymentPendingPopup,
    paymentGatewayPopup,
    paymentPendingPopup,
    paymentSecurityPopup,
    setPaymentGatewayPopup,
    setPaymentSecurityPopup,
    setModal,
  } = useModalContext();

  const requestSecurityVerification = (type) => {
    if (
      type !== '' &&
      type !== 'url' &&
      type !== 'pending' &&
      type !== 'failed' &&
      !paymentSecurityPopup
    ) {
      setPaymentSecurityPopup(true);
      setPaymentGatewayPopup(false);
    } else if (type === 'pending' && !paymentPendingPopup) {
      setPaymentGatewayPopup(false);
      setPaymentPendingPopup(true);
    } else if (type === 'open_url') {
      setOpenUrl(true);
      // setPaymentSecurityPopup(true);
      // setPaymentGatewayPopup(false);
      // setModal(true);
      // setPayment(null);
    }
  };

  useEffect(() => {
    const text = payment ? payment.status.split('send_').join('') : '';

    requestSecurityVerification(text);
    setState({ ...state, ...defaultState, ...payment, text });
  }, [payment]);

  useEffect(() => {
    if (openUrl) {
      console.log({ payment });
      if (payment.url) {
        window.open(payment.url, 'paystack_Gateway');
      } else {
        setPayment(null);
        return setOpenUrl(false);
      }

      // socket listening to event
      socket = io(to);

      socket.on(`${payment.reference}`, (data) => {
        saveOpenUrlResponse(data.data);
      });

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [openUrl]);

  const handleClick = (incl) => {
    if (incl) setPayment(null);
    setModal(false);
    setOpenUrl(false);
    setPaymentGatewayPopup(false);
  };
  const saveOpenUrlResponse = async (data) => {
    try {
      loading(true);
      const response = await API.url.post({
        reference: payment.reference,
        ...data,
      });
      if (response.status === 201) return saveCardAndClosePopup(response);
      setPayment({ ...payment, ...response.data.data });
      loading(false);
    } catch (error) {
      loading(false);
    }
  };

  const saveCardAndClosePopup = (response) => {
    console.log(response.data.newCard);
    setCard(response.data.newCard);
    setPayment(null);
    loading(false);
    handleClick();
  };

  const handleSubmit = async () => {
    try {
      loading(true);
      const response = await API.card.get(state.reference);
      console.log({ response });
      if (response.status === 201) return saveCardAndClosePopup(response);
      setPayment({ ...payment, ...response.data.data });
      loading('PAYMENT', false);
    } catch (error) {
      loading('PAYMENT', false);
    }
  };

  return (
    <Modal
      onClickOut={() => {}}
      show={paymentGatewayPopup}
      bodyClassName="FullWidth"
    >
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
