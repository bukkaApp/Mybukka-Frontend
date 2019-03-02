import React, { Fragment, useState, useEffect } from 'react';

import TextArea from 'Components/input/TextArea';
import PropTypes, { any } from 'prop-types';
import DeliveryOrPickupNav from 'Components/common-navs/DeliveryOrPickupNav';
import Button from 'Components/button/Button';
import inputField from '../InputAttribute/inputData.json';
import { validateAField, validateAllFields } from '../validation/validateField';

import './payment.scss';
import './deliveryAddress.scss';
import AuthForm from '../common/AuthForm';
import Demarcation from '../common/SmallScreenDivider';

const DeliveryForm = ({
  setWrapperRef,
  inputData,
  validationErrors,
  handleSaveButton,
  autoComplete,
  handleChange
}) => (
  <form ref={setWrapperRef} className="border padding-20 mt-4">
    <AuthForm
      inputData={inputData}
      inputField={inputField.deliveryAddress}
      handleChange={handleChange}
      errors={validationErrors}
      autoComplete={autoComplete}
    />
    <div className="form-group mb-4">
      <TextArea
        placeholderText="Add delivery instructuctions..."
        name="deliveryInstruction"
        classNames="instruction"
      />
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
);

const Pickup = ({ title, name }) => (
  <section className="container mb-2 mt-4">
    <h2 className="font-size-16">{title}</h2>
    <ul className="list-group mt-4 time">
      <li className="list-group-item">{name}</li>
    </ul>
  </section>
);

const Delivery = () => {
  let wrapperRef;
  const [isPickup, setIsPickup] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
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

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      setAutoComplete(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
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
    if (name === 'streetAddress1') {
      setAutoComplete(true);
    }
  };

  const handleSaveButton = (e) => {
    e.preventDefault();
    const validation = validateAllFields(inputData);
    setValidationErrors({
      ...validationErrors,
      ...validation
    });
  };

  return (
    <div className="mb-2 mt-4">
      <h1 className="font-size-36 px-3 px-md-3 px-lg-0">Checkout</h1>
      <div className="col-md-12 col-lg-6 p-0 mb-4 mt-4 height-50">
        <DeliveryOrPickupNav handleClick={() => setIsPickup(!isPickup)} />
      </div>
      <Demarcation />
      <h2 className="font-size-16 px-3 px-md-3 px-lg-0">Delivery Address</h2>
      <DeliveryForm
        inputData={inputData}
        handleChange={handleChange}
        validationErrors={validationErrors}
        autoComplete={autoComplete}
        setWrapperRef={setWrapperRef}
        handleSaveButton={handleSaveButton}
      />
      {isPickup && (
        <Fragment>
          <Pickup
            title="Pickup Address"
            name="801 Mission St., San Francisco (1.0 mi)"
          />
          <Pickup title="Pickup time" name="Ready in 20 min" />
        </Fragment>
      )}
    </div>
  );
};

export default Delivery;

DeliveryForm.propTypes = {
  inputData: PropTypes.objectOf(any).isRequired,
  handleChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.bool.isRequired,
  setWrapperRef: PropTypes.objectOf(any).isRequired,
  handleSaveButton: PropTypes.func.isRequired,
  validationErrors: PropTypes.objectOf(any).isRequired
};

Pickup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
