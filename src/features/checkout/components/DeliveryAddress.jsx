import React, { useState } from 'react';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import Button from 'Components/button/Button';
import inputField from '../InputAttribute/inputData.json';
import
{ validateAField, validateAllFields }
  from '../validation/validateField';
import './payment.scss';
import './deliveryAddress.scss';
import AuthForm from '../common/AuthForm';

const Delivery = () => {
  const [validationErrors, setValidationErrors] = useState({
    streetAddress1: '',
    streetAddress2: '',
    contactName: '',
    phoneNumber: ''
  });

  const [inputData, setInputData] = useState({
    streetAddress1: '',
    streetAddress2: '',
    contactName: '',
    phoneNumber: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({
      ...inputData,
      ...newFieldData,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message,
    });
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    const validation = validateAllFields(inputData);
    setValidationErrors({
      ...validationErrors,
      ...validation,
    });
  };

  return (
    <div className="container mb-2 mt-4">
      <h1 className="font-size-36">Checkout</h1>
      <div className="col-md-6 p-0 mb-4 mt-4 height-50">
        <DeliveryOrPickupNav />
      </div>
      <h2 className="font-size-16">Delivery Address</h2>
      <form className="border padding-20 mt-4">
        <AuthForm
          inputData={inputData}
          inputField={inputField.deliveryAddress}
          handleChange={handleChange}
          errors={validationErrors}
        />
        <div className="form-group mb-4">
          <textarea
            placeholder="Add delivery
            instructions. (e.g. “Use the call box when you arrive)."
            name="instruction"
            className="form-control instruction"
          />
        </div>
        <div>
          <Button
            type="button"
            text="Save"
            classNames="medium-button"
            handleClick={handleSaveButton}
          />
        </div>
      </form>

    </div>
  );
};

export default Delivery;
