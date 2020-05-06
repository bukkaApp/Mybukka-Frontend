/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';

import Button from 'Components/button/Button';
import InputField from 'Components/input/InputField';
import Modal from 'Components/modal';
import DismissModal from 'Components/modal/DismissModal';
import ChevronRight from 'Icons/ChevronRight';

import verifyCardTransaction from '../actionCreators/verifyCardTransaction';
import saveUserCard from '../actionCreators/saveUserCard';

import './securityModalInfo.scss';

const SuccessMessage = () => (
  <div className="success-message-prompt animated slideInLeft">
    <div className="text-center">
      <h5>SUCCESS</h5>
      <p>YOU CAN NOW PROCEED TO ORDER</p>
    </div>
  </div>
);

const InputKeyForm = ({
  setKey,
  reference,
  pin,
  receiver,
  amount,
  status,
  url,
  saveCard,
  displayText,
}) => {
  const [active, setActive] = useState(false);
  const keyType = status.split('send_').join('');

  const handleClick = () => {
    if (!active) {
      saveCard({ reference, [keyType]: pin, receiver, amount, });
      setActive(true);
    }
  };

  /**
   * @function awaitResponse
   * @summary await card confirmation Response interface if response was pending
   * @returns {jsx} jsx
   */
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

  /**
   * @function requestSecurityInfo
   * @summary Request security info like otp, pin for card confirmation
   * @returns {jsx} jsx
   */
  const requestSecurityInfo = () => (
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
      {(keyType !== 'pending' && !url) && requestSecurityInfo()}
      {/* {(keyType !== 'pending' && url) && openUrlResponse()} */}
    </div>
  );
};

const SendSecurityKeyForm = ({
  reference,
  receiver,
  amount,
  chargeStatus,
  saveCard,
  verifyCard,
  transactionSuccess,
  paymentStatus,
  displayText,
  cardSaved,
  url,
}) => {
  const [key, setKey] = useState('');
  const [sent, setState] = useState(false);
  const [visibleCount, setVisibility] = useState(0);
  const [tried, setTrial] = useState(1);

  const timeoutMessageDisplay = useCallback(() => {
    if (cardSaved) {
      setVisibility(0);
    }
  }, [cardSaved]);

  const reauthorizePayment = useCallback(() => {
    let clear;
    if (paymentStatus === 'pending' && !sent && tried < 3) {
      verifyCard(reference);
      clear = setInterval(() => {
        verifyCard(reference);
        setTrial(tried + 1);
      }, 50000);
    }
    if (tried >= 3) {
      clearInterval(clear);
      setState(true);
    }
  }, [paymentStatus, sent, tried]);

  useEffect(() => {
    timeoutMessageDisplay();
    reauthorizePayment();
  });

  return (
    <Modal dataTarget="inputSecurityKey">
      <DismissModal />
      {(visibleCount >= 0 && cardSaved)
        && Object.keys(cardSaved).length > 0 && <SuccessMessage />}
      <InputKeyForm
        setKey={setKey}
        reference={reference}
        pin={key}
        receiver={receiver}
        amount={amount}
        url={url}
        status={(paymentStatus && displayText && !cardSaved) ? paymentStatus
          : (!transactionSuccess && !paymentStatus && !cardSaved) ? chargeStatus : ''}
        saveCard={saveCard}
        displayText={(paymentStatus && displayText && !cardSaved) ? displayText : null}
      />
    </Modal>
  );
};

const mapStateToProps = ({
  saveUserCardReducer: {
    status: { success },
    // errorMessage,
    newPayment: { status: paymentStatus, display_text: displayText, card },
    message
  },
  chargeUserReducer: {
    data: { reference, status, url }
  },
  cartReducer: { totalCost },
  fetchBukkaReducer: {
    fetchedBukka: { slug }
  },
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
  transactionSuccess,
  transactionDetails,
  paymentStatus,
  displayText,
  cardSaved: card,
  url,
});

export default connect(
  mapStateToProps,
  {
    saveCard: saveUserCard,
    verifyCard: verifyCardTransaction,
  }
)(SendSecurityKeyForm);
