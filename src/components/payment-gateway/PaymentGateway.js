import React, { useEffect, useState } from 'react';

import Iframe from 'react-iframe';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import io from 'socket.io-client';

import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import { useToastContext } from '../../context/ToastContext';
import { backendUrl } from './../../redux/axios/index';

const defaultState = {
  reference: '',
  status: '',
  url: '',
  display_text: '',
  text: '',
};

let socket;
const to = backendUrl;

// handles redirections to bank url
const PaymentGateway = () => {
  const [openUrl, setOpenUrl] = useState(false);

  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { payment, setPayment, setCard } = useUserContext();
  const { setToast } = useToastContext();
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

  // const requestSecurityVerification = (type) => {
  //   if (
  //     type !== '' &&
  //     type !== 'url' &&
  //     type !== 'pending' &&
  //     type !== 'failed' &&
  //     !paymentSecurityPopup
  //   ) {
  //     setPaymentSecurityPopup(true);
  //     setPaymentGatewayPopup(false);
  //   } else if (type === 'pending' && !paymentPendingPopup) {
  //     setPaymentGatewayPopup(false);
  //     setPaymentPendingPopup(true);
  //   } else if (type === 'open_url') {
  //     setOpenUrl(true);
  //   }
  // };

  const requestSecurityVerification = (data) => {
    console.log({ data });
    const text = payment ? payment.status.split('send_').join('') : '';
    switch (data.status) {
      case 'status':
        return setModal(false);
      case 'abandoned':
      case 'failed':
        setToast({ message: data.gateway_response });
        setPaymentSecurityPopup(false);
        setPaymentGatewayPopup(false);

        setPayment(null);
        break;
      case 'success':
        if (
          data.gateway_response === 'Approved' ||
          data.gateway_response === 'Successful'
        ) {
          setPaymentSecurityPopup(false);
          setPaymentGatewayPopup(false);
          // saveCardAndClosePopup()
          setModal(false);
          setPayment(null);
        }
        break;
      case 'url':
        break;
      case 'pending':
        if (!paymentPendingPopup) {
          setPaymentGatewayPopup(false);
          setPaymentPendingPopup(true);
        }
        break;
      case 'open_url':
        setOpenUrl(true);
        setPaymentSecurityPopup(true);
        setPaymentGatewayPopup(false);
        setState({ ...state, ...defaultState, ...payment, text });
        break;
      case 'send_phone':
      case 'send_birthday':
      case 'send_otp':
      case 'send_pin':
      case 'send_address':
        if (!paymentSecurityPopup) {
          setPaymentSecurityPopup(true);
          setPaymentGatewayPopup(false);
          setState({ ...state, ...defaultState, ...payment, text });
        }
        break;
      default:
        setPayment(null);
        setModal(false);
        break;
    }
  };

  useEffect(() => {
    if (payment) {
      // Paystackhandler(payment);
      requestSecurityVerification(payment);
    }
  }, [payment]);

  useEffect(() => {
    if (openUrl) {
      if (payment && payment.url) {
        window.open(payment.url, 'paystack_Gateway');
      } else {
        setPayment(null);
        setOpenUrl(false);
      }
      // socket listening to event
      socket = io(to);

      socket.on(`${payment && payment.reference}`, (data) => {
        saveOpenUrlResponse(data.event);
      });

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [openUrl, payment]);

  const handleClick = (incl) => {
    setModal(false);
    setOpenUrl(false);
    setPaymentGatewayPopup(false);
    if (incl) setPayment(null);
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
    handleClick();
    setPayment(null);
    loading(false);
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
      {/* <Iframe
        url={state.url || 'https://standard.paystack.co/close'}
        position="relative"
        width="100%"
        id="myId"
        frameBorder="0"
        className="myClassname"
        height="100%"
      /> */}
    </Modal>
  );
};

export default PaymentGateway;
