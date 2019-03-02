import React, { useState } from 'react';

import InputField from 'Components/input/InputField';
import Button from 'Components/button/Button';

import { validateAField, validateAllFields } from '../validation/validateField';
import inputFeild from '../InputAttribute/inputData.json';
import './payment.scss';
import AuthForm from '../common/AuthForm';
import Demarcation from '../common/SmallScreenDivider';

const Payment = () => {
  const [validationErrors, setValidationErrors] = useState({
    number: '',
    expDate: '',
    cvv: '',
    zipCode: ''
  });

  const [inputData, setInputData] = useState({
    number: '',
    expDate: '',
    cvv: '',
    zipCode: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleSaveButton = (event) => {
    event.preventDefault();
    const validation = validateAllFields(inputData);
    setValidationErrors({
      ...validationErrors,
      ...validation
    });
  };

  return (
    <section className="mb-2 mt-4">
      <h2 className="font-size-16 px-3 px-md-3 px-lg-0">Payment</h2>
      <form className="border padding-20 mt-4" action="">
        <div className="row flex- flex-nowrap-sm font-size-14">
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
            type="button"
            text="Save"
            classNames="small-button-save"
            handleClick={handleSaveButton}
          />
        </div>
      </form>
      <Demarcation />
    </section>
  );
};

export default Payment;
