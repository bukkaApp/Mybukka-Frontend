import React, { useState } from 'react';

import { connect } from 'react-redux';

import Button from 'Components/button/Button';
import InputField from 'Components/input/InputField';
import Modal from 'Components/modal/Modal';
import DismissModal from 'Components/modal/DismissModal';
import ChevronRight from 'Icons/ChevronRight';

import finishChargeTransaction from '../actionCreators/finishChargeTransaction';

import './securityModalInfo.scss';

const SuccessMessage = () => (
  <div className="success-message-prompt animated slideInLeft">
    <div className="text-center">
      <h5>SUCCESS</h5>
      <p>ORDER SUCCESSFULLY COMPLETED</p>
    </div>
  </div>
);

const InputKeyForm = ({
  setKey,
  reference,
  pin,
  receiver,
  amount,
  finishTransaction
}) => (
  <div className="send-security-section animated">
    <h5 className="text-center">Submit OTP</h5>
    <br />
    <div className="send-security-form-inline">
      <InputField
        handleChange={event => setKey(event.target.value)}
        handleFocus={() => ({})}
        placeholderText="SUBMIT OTP"
      />
      <Button
        classNames="btn-go"
        handleClick={() =>
          finishTransaction({ reference, pin, receiver, amount })
        }
      >
        <ChevronRight />
      </Button>
    </div>
  </div>
);

const SendSecurityKeyForm = ({
  reference,
  success,
  message,
  receiver,
  amount,
  finishTransaction
}) => {
  const [key, setKey] = useState('');

  return (
    <Modal dataTarget="inputSecurityKey">
      <DismissModal />
      {success ? (
        <SuccessMessage />
      ) : (
        <InputKeyForm
          setKey={setKey}
          reference={reference}
          pin={key}
          receiver={receiver}
          amount={amount}
          finishTransaction={finishTransaction}
        />
      )}
    </Modal>
  );
};

const mapStateToProps = ({
  finishTransactionReducer: {
    status: { success },
    message
  },
  chargeUserReducer: {
    data: { reference }
  },
  fetchBukkaMenuReducer: { totalPriceInCart },
  fetchBukkaReducer: {
    fetchedBukka: { slug }
  }
}) => ({
  success,
  message,
  reference,
  receiver: slug,
  amount: totalPriceInCart
});

export default connect(
  mapStateToProps,
  { finishTransaction: finishChargeTransaction }
)(SendSecurityKeyForm);
