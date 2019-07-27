/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';

import InputField from 'Components/input/InputField';
import Button from 'Components/button/Button';

import inputFeild from '../InputAttribute/inputData.json';
import AuthForm from '../common/AuthForm';

import './card.scss';

const type = ['mastercard', 'visa'];
const cardColor = {
  mastercard: 'light',
  visa: 'primary'
};

const bgColor = {
  mastercard: 'mastercard',
};

const CardIcon = ({ cardType }) => (
  type.includes(cardType) ?
    <i className={`fab fa-cc-${cardType}
        text-${cardColor[cardType]} ${bgColor[cardType]}
        size-2`}
    /> :
    <i className="fas fa-credit-card text-primary bg-light" />
);

const Card = ({
  last4, cardType, expiredMonth, expiredYear, handleClick, selected
}) => {
  const userCardType = cardType.split(' ')[0];
  return (
    <div
      className="d-flex text-uppercase
      justify-content-around align-items-center bg-light py-1 cursor-pointer"
      onClick={handleClick}
      aria-pressed="false"
      tabIndex="0"
      role="button"
    >
      <InputField
        type="radio"
        classNames="radio"
        placeholder=""
        checked={selected}
        name="makeDefaultPaymentOption"
        handleChange={() => {}}
        handleFocus={() => {}}
      />
      <CardIcon cardType={userCardType} />
      <h6 className="m-0">{userCardType}</h6>
      <p className="m-0">***{last4} ({expiredMonth}/{expiredYear.slice(-2)})</p>
    </div>
  );
};


export const AddCard = ({ cards,
  handleChange,
  validationErrors,
  handleSaveButton,
  inputData,
  handleClick,
  active
}) => (
  <Fragment>
    {cards.length > 0 && <div
      onKeyDown={() => {}}
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={handleClick}
      className="text-muted cursor-pointer"
    >
      <i className="fas fa-chevron-left mr-2 mb-2" />
            show cards</div>}
    <div className="row flex-row flex-nowrap-sm font-size-14">
      <AuthForm
        inputData={inputData}
        inputField={inputFeild.payment}
        handleChange={handleChange}
        errors={validationErrors}
      />
    </div>

    <div className="form-group checkbox-form-group">
      <InputField
        type="checkbox"
        classNames="checkbox"
        placeholder=""
        name="makeDefaultPaymentOption"
        handleChange={() => {}}
        handleFocus={() => {}}
      />
      <span className="make-default-text">Make default payment method</span>
    </div>

    <div>
      <Button
        type="submit"
        classNames={`small-button btn-color ${active && 'cursor-progress'}`}
        handleClick={handleSaveButton}
      >
        {!active && 'Save'}
        {active &&
        <span
          style={{ width: '1rem', height: '1rem' }}
          className="spinner-border"
          role="status"
        />}
      </Button>
    </div>
  </Fragment>
);

export default Card;
