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
      setPaymentSecurityPopup(false);
      setPaymentGatewayPopup(false);
      setModal(false);
    } else if (type === 'send_birthday') {
    } else if (type === 'send_phone') {
    } else if (type === 'send_otp') {
    }
  };

  useEffect(() => {
    // const text = payment;
    console.log({ payment });
    const text = payment ? payment.status.split('send_').join('') : '';
    requestSecurityVerification(text);
    setState({ ...state, ...defaultState, ...payment, text });
  }, [payment]);

  useEffect(() => {
    if (openUrl) {
      console.log({ payment });
      window.open(payment.url, 'paystack_Gateway');
      setPayment(null);
      setOpenUrl(null);

      // socket listening to event
      socket = io(to);

      socket.on(`${payment.reference}`, (data) => {
        console.log({ data });
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
    setPaymentGatewayPopup(false);
  };

  const saveCardAndClosePopup = (response) => {
    setCard(response.data.newCard);
    setPayment(null);
    loading(false);
    handleClick();
  };
  const handleOpenUrl = () => {
    setOpenUrl(true);
  };
  const handleSubmit = async () => {
    // try {
    loading(true);
    const response = await API.card.get(state.reference);
    console.log({ response });
    //   if (response.status === 201) return saveCardAndClosePopup(response);
    //   setPayment({ ...payment, ...response.data.data });
    //   loading('PAYMENT', false);
    // } catch (error) {
    //   loading('PAYMENT', false);
    // }
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
