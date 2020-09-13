import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChevronRight from '../icons/ChevronRight';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import Fields from '../input/Field';
import Button from '../button/Button';
import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import './PaymentSecurity.scss';
import SmallSpinner from './../spinners/SmallSpinner';

const defaultPayment = {
  reference: '',
  status: '',
  url: '',
  display_text: '',
  text: '',
};

let socket;
// const to = 'http://localhost:1234/';
const to = 'https://mybukka-backend.herokuapp.com/';

const RequestSecurityInfo = () => {
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
  const [input, setInput] = useState('');
  const [inlineLoading, setInlineLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    paymentSecurityPopup,
    paymentGatewayPopup,
    paymentPendingPopup,
    setPaymentSecurityPopup,
    setPaymentPendingPopup,
    setPaymentGatewayPopup,
    setModal,
  } = useModalContext();

  // const requestOtherVerification = (type) => {
  //   if (type === 'failed') return setModal();
  //   if (type === 'url' && !paymentGatewayPopup) {
  //     setPaymentSecurityPopup(false);
  //     setPaymentGatewayPopup(true);
  //   } else if (type === 'pending' && !paymentPendingPopup) {
  //     setPaymentSecurityPopup(false);
  //     setPaymentPendingPopup(true);
  //   } else if (type === 'open_url') {
  //     setOpenUrl(true);
  //   }
  // };

  const requestOtherVerification = (data) => {
    switch (data.status) {
      case 'status':
        return setModal;
      case 'success':
        if (data.gateway_response === 'Approved') {
        } else if (data.gateway_response === 'Successful') {
        }

        break;
      case 'url':
      case 'pending':
        if (!paymentPendingPopup) {
          setPaymentSecurityPopup(false);
          setPaymentGatewayPopup(true);
        }
        break;

      case 'failed':
        break;
      case 'open_url':
        setOpenUrl(true);
        setPaymentSecurityPopup(true);
        setPaymentGatewayPopup(false);
      case 'send_phone':
      case 'send_birthday':
      case 'send_otp':
      case 'send_pin':
      case 'send_address':
        setPaymentSecurityPopup(true);
        setPaymentGatewayPopup(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (openUrl) {
      if (payment && payment.url) {
        window.open(payment.url, 'paystack_Gateway');
      } else {
        setOpenUrl(false);
        setPayment(null);
      }
      // socket listening to event
      socket = io(to);

      socket.on(`${payment && payment.reference}`, (data) => {
        console.log({ data });
      });

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, [openUrl, payment]);

  useEffect(() => {
    if (payment) {
      const text = payment ? payment.status.split('send_').join('') : '';
      requestOtherVerification(payment);
      setState({ ...state, ...defaultPayment, ...payment, text });
    }
  }, [payment]);

  const handleClick = (incl) => {
    setModal(false);
    setPaymentSecurityPopup(false);
    setOpenUrl(false);
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
    loading(false);
    handleClick();
    setPayment(null);
  };

  const handleSubmit = async (e) => {
    if (input.length < 3) return;
    e.preventDefault();
    setInlineLoading(true);
    try {
      loading(true);
      const response = await API.card.post({
        reference: payment.reference,
        [state.text]: input,
      });
      setInlineLoading(false);
      setInput('');
      if (response.status === 201) return saveCardAndClosePopup(response);
      setPayment({ ...payment, ...response.data.data });
      setErrorMessage('');
      loading(false);
    } catch (error) {
      setInlineLoading(false);
      const errMsg = error.response.data.error || error.response.data.message;
      setErrorMessage(errMsg || '');
      loading(false);
    }
  };

  return (
    <Modal
      show={paymentSecurityPopup}
      bodyClassName="SmallWidth"
      onClickOut={() => {}}
    >
      <div className="text-end">
        <DismissModal onClick={() => handleClick(true)} />
      </div>
      {state.url ? (
        <div className="wait-div">
          <p className="wait-text">
            Please wait while while you are being re-directed to your bank page.
          </p>
        </div>
      ) : (
        <form className="container Request-Security-Info">
          <h5 className="text-center">
            {state.display_text.toUpperCase() ||
              `SUBMIT ${state.text.toUpperCase()}`}
          </h5>
          <br />
          <div className="send-security-form-inline">
            <Fields.Input
              value={input}
              name={state.text}
              handleChange={(event) => setInput(event.target.value)}
              onFocus={() => {}}
              placeholderText={`SUBMIT ${state.text.toUpperCase()}`}
            />
            <Button
              type="button"
              classNames="btn-go"
              handleClick={handleSubmit}
            >
              {!inlineLoading && <ChevronRight />}
              {inlineLoading && (
                <span className="spinner-border" role="status" />
              )}
            </Button>
          </div>
          <small className="text-danger">{errorMessage}</small>
        </form>
      )}
    </Modal>
  );
};

export default RequestSecurityInfo;
