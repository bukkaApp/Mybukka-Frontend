import React from 'react';

import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import DismissModal from '../modal/DismissModal';
import { useModalContext } from '../../context/ModalContext';

import PaymentForm from './PaymentForm';
import './Payment.scss';
import Container from '../container/Container';

const PaymentHeader = ({ handleClick }) => (
  <div className="Payment-Form-Header pb-1">
    <div className="text-end">
      <DismissModal onClick={handleClick} />
    </div>
    <div className="Payment-Details-Header">
      <h5 className="Payment-Details-Text">Add Delivery Payment</h5>
    </div>
  </div>
);

const Payment = (props) => {
  const { paymentPopup, setPaymentPopup, paymentSecurityPopup, setPaymentSecurityPopup, setModal } = useModalContext();

  const requestSecurityPopup = () => {
    if (!props.withModal) setModal(true);
    if (!paymentSecurityPopup) setPaymentSecurityPopup(true);
  };

  const handleClick = (incl) => {
    if (incl && props.withModal) setModal(false);
    setPaymentPopup(false);
  };

  const paymentFormJsx = <PaymentForm requestSecurityPopup={requestSecurityPopup} handleClick={handleClick} {...props} />;

  if (props.withModal) {
    return (
      <Modal show={paymentPopup} bodyClassName="SmallWidth" onClickOut={() => handleClick(true)} >
        <Container classNames="Payment-Wrapper">
          <PaymentHeader handleClick={() => handleClick(true)} />
          {paymentFormJsx}
        </Container>
      </Modal>
    );
  }
  return paymentFormJsx;
};

export default Payment;

Payment.defaultProps = {
  type: 'payment'
};

Payment.propTypes = {
  type: PropTypes.string
};
