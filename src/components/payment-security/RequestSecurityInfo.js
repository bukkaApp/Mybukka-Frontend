import React, { useEffect, useState } from 'react';
import ChevronRight from '../icons/ChevronRight';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import Fields from '../input/Field';
import Button from '../button/Button';
import useApi from '../../shared/api';
import { useModalContext } from '../../context/ModalContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import './RequestSecurityInfo.scss';

const RequestSecurityInfo = () => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { payment, setPayment, setCard } = useUserContext();
  const [state, setState] = useState({ reference: '', status: '', url: '', display_text: '', text: '' });
  const [input, setInput] = useState('');
  const [inlineLoading, setInlineLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { paymentSecurityPopup, setPaymentSecurityPopup, setPaymentPendingPopup, setPaymentGatewayPopup, setModal } = useModalContext();

  const requestOtherVerification = (type) => {
    if (type === 'url') {
      setPaymentSecurityPopup(false);
      setPaymentGatewayPopup(true);
    } else if (type === 'pending') {
      setPaymentSecurityPopup(false);
      setPaymentPendingPopup(true);
    }
  };

  useEffect(() => {
    const text = payment ? payment.status.split('send_').join('') : '';
    requestOtherVerification(text);
    setState({ ...state, ...payment, text });
  }, [payment]);

  const handleClick = (incl) => {
    if (incl) setPayment(null);
    setModal(false);
    setPaymentSecurityPopup(false);
  };

  const saveCardAndClosePopup = (response) => {
    setCard(response.data.data);
    setPayment(null);
    loading('PAYMENT', false);
    handleClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInlineLoading(true);
    try {
      loading('PAYMENT', true);
      const response = await API.card.post({ reference: payment.reference, [state.text]: input, });
      setInlineLoading(false);
      if (response.status === 201) return saveCardAndClosePopup(response);
      setPayment({ ...payment, ...response.data.data });
      loading('PAYMENT', false);
    } catch (error) {
      setInlineLoading(false);
      const errMsg = error.response.data.error || error.response.data.message;
      setErrorMessage(errMsg || '');
      loading('PAYMENT', false);
    }
  };

  return (
    <Modal show={paymentSecurityPopup} bodyClassName="SmallWidth" ref={() => {}}>
      <div className="text-end">
        <DismissModal onClick={() => handleClick(true)} />
      </div>
      <form className="container Request-Security-Info">
        <h5 className="text-center">{state.display_text.toUpperCase() || `SUBMIT ${state.text.toUpperCase()}`}</h5>
        <br />
        <div className="send-security-form-inline">
          <Fields.Input
            value={input}
            name={state.text}
            handleChange={event => setInput(event.target.value)}
            onFocus={() => {}}
            placeholderText={`SUBMIT ${state.text.toUpperCase()}`}
          />
          <Button
            classNames="btn-go"
            handleClick={handleSubmit}
          >
            {!inlineLoading && <ChevronRight />}
            {inlineLoading && <span className="spinner-border" role="status" />}
          </Button>
        </div>
        <small className="text-danger">{errorMessage}</small>
      </form>
    </Modal>
  );
};

export default RequestSecurityInfo;
