import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Button from 'Components/button/Button';
import InputField from 'Components/input/InputField';
import Modal from 'Components/modal/Modal';
import DismissModal from 'Components/modal/DismissModal';
import ChevronRight from 'Icons/ChevronRight';

import verifyCardTransaction from '../actionCreators/verifyCardTransaction';
import finishChargeTransaction from '../actionCreators/finishChargeTransaction';
import saveUserCard from '../actionCreators/saveUserCard';

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
  status,
  saveUserCard,
  displayText,
}) => {
  const [active, setActive] = useState(false);
  const keyType = status.split('send_').join('');

  const handleClick = () => {
    if (!active) {
      saveUserCard({ reference, [keyType]: pin, receiver, amount, });
      setActive(true);
    }
  };

  const awaitResponse = () => (
    <>
      <h5 className="text-center">Submittion Pending </h5>
      <h6 className="text-center">Please hold on while your transaction is confirmed </h6>
      <br />
      <div className="d-flex justify-content-center" role="status">
        <div className="spinner-border mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );

  const requestSecurity = () => (
    <>
      <h5 className="text-center">Submit {keyType.toUpperCase()}</h5>
      {displayText && <h6 className="text-center">{displayText}</h6>}
      <br />
      <div className="send-security-form-inline">
        <InputField
          handleChange={event => setKey(event.target.value)}
          handleFocus={() => ({})}
          placeholderText={`SUBMIT ${keyType.toUpperCase()}`}
        />
        <Button
          classNames="btn-go"
          handleClick={() => handleClick()}
        >
          {!active && <ChevronRight />}
          {active && <span className="spinner-border" role="status" />}
        </Button>
      </div>
    </>
  );

  return (
    <div className="send-security-section animated">
      {keyType === 'pending' && awaitResponse()}
      {keyType !== 'pending' && requestSecurity()}
    </div>
  );
};

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
  push,
  chargeStatus,
  saveCard,
  verifyCard,
  transactionSuccess,
  transactionDetails,
  paymentStatus,
  displayText,
  errorMessage,
}) => {
  const [key, setKey] = useState('');
  const [sent, setState] = useState(false);
  const [connectionNumb, setConnectionNumb] = useState(0);

  useEffect(() => {
    let clear;
    console.log('ddfjkjsdk', transactionDetails);
    if (paymentStatus === 'pending' && !sent && connectionNumb < 3) {
      verifyCard(reference);
      clear = setInterval(() => {
        verifyCard(reference);
        setConnectionNumb(connectionNumb + 1);
      }, 50000);
    }
    if (connectionNumb >= 3) {
      clearInterval(clear);
      setState(true);
    }
  });

  return (
    <Modal dataTarget="inputSecurityKey">
      <DismissModal />
      {(transactionSuccess && !paymentStatus) && <SuccessMessage />}
      {(!transactionSuccess && !paymentStatus) && <InputKeyForm
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
        status={chargeStatus}
        saveUserCard={saveCard}
      />}
      {paymentStatus && <InputKeyForm
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
        status={paymentStatus}
        saveUserCard={saveCard}
        displayText={displayText}
      />}
    </Modal>
  );
};

const mapStateToProps = ({
  saveUserCardReducer: {
    status: { success },
    errorMessage,
    newPayment: { status: paymentStatus, display_text: displayText },
    message
  },
  chargeUserReducer: {
    data: { reference, status }
  },
  cartReducer: { totalCost },
  fetchBukkaReducer: {
    fetchedBukka: { slug }
  },
  deliveryModeReducer: { mode },
  selectedLocationReducer: { coordinates },
  verifyCardReducer: {
    transactionDetails, status: { success: transactionSuccess }
  }

}) => ({
  success,
  message,
  reference,
  chargeStatus: status,
  receiver: slug,
  amount: totalCost,
  mode,
  coordinates,
  transactionSuccess,
  transactionDetails,
  paymentStatus,
  displayText,
});

export default connect(
  mapStateToProps,
  { finishTransaction: finishChargeTransaction,
    saveCard: saveUserCard,
    verifyCard: verifyCardTransaction
  }
)(SendSecurityKeyForm);
