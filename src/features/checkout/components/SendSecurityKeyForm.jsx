import React, { useState, useEffect } from 'react';

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
  finishTransaction,
  mode,
  cart,
  deliveryAddress,
  day,
  time,
  coordinates,
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
          finishTransaction({ reference, pin, receiver, amount, mode, order: { deliveryAddress, cart, day, time, coordinates } })
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
  finishTransaction,
  cart,
  mode,
  deliveryAddress,
  day,
  time,
  coordinates,
  push
}) => {
  const [key, setKey] = useState('');

  useEffect(() => {
    if (success) {
      push('/map');
    }
  });

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
          cart={cart}
          mode={mode}
          deliveryAddress={deliveryAddress}
          coordinates={coordinates}
          day={day}
          time={time}
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
  cartReducer: { totalCost },
  fetchBukkaReducer: {
    fetchedBukka: { slug }
  },
  deliveryModeReducer: { mode },
  selectedLocationReducer: { coordinates }

}) => ({
  success,
  message,
  reference,
  receiver: slug,
  amount: totalCost,
  mode,
  coordinates,
});

export default connect(
  mapStateToProps,
  { finishTransaction: finishChargeTransaction }
)(SendSecurityKeyForm);
