import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Modal from 'Components/modal/Modal';
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
  const wrapperRef = React.createRef();
  const { paymentPopup, setPaymentPopup, paymentSecurityPopup, setPaymentSecurityPopup, setModal } = useModalContext();

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setModal(false);
      setPaymentPopup(false);
    }
  };

  const requestSecurityPopup = () => {
    if (!props.withModal) setModal(true);
    if (!paymentSecurityPopup) setPaymentSecurityPopup(true);
  };

  const handleClick = (excl) => {
    if (excl && props.withModal) setModal(false);
    setPaymentPopup(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const paymentJsx = <PaymentForm requestSecurityPopup={requestSecurityPopup} handleClick={handleClick} {...props} />;

  if (props.withModal) {
    return (
      <Modal show={paymentPopup} bodyClassName="SmallWidth" ref={wrapperRef}>
        <Container classNames="Payment-Wrapper">
          <PaymentHeader handleClick={() => handleClick(true)} />
          {paymentJsx}
        </Container>
      </Modal>
    );
  }
  return paymentJsx;
};

export default Payment;

Payment.defaultProps = {
  type: 'payment'
};

Payment.propTypes = {
  type: PropTypes.string
};
