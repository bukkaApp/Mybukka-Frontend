import React, { useState, useEffect } from 'react';

import TextArea from 'Components/input/TextArea';
import PropTypes, { any } from 'prop-types';
import { connect } from 'react-redux';
import verifyToken from 'Utils/verifyToken';
import Button from 'Components/button/Button';
import inputField from '../InputAttribute/inputData.json';
import { validateAField, validateAllFields } from '../validations/validateAddressAndPayment';

import './deliveryAddress.scss';
import AuthForm from '../common/AuthForm';
import postUserData from '../actionCreators/postUserData';

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
        handleChange={() => {}}
        handleFocus={() => {}}
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

const Delivery = ({ sendUserAddress }) => {
  let wrapperRef;
  const [autoComplete, setAutoComplete] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    streetAddress1: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const [inputData, setInputData] = useState({
    streetAddress1: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const defaultData = {
    streetAddress1: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  };

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
    const address = `${inputData.streetAddress1} ${inputData.streetAddress2}`;
    const data = {
      ...inputData,
      address,
    };
    const validation = validateAllFields(inputData);
    const { errors, passes } = validation;
    setValidationErrors({
      ...validationErrors,
      ...errors
    });
    console.log(passes);
    if (passes) {
      const token = localStorage.getItem('x-access-token');
      const { slug } = verifyToken(token);
      setInputData({
        ...inputData,
        ...defaultData
      });
      // if token expires re-login
      return sendUserAddress(`/${slug}/address`, data);
    }
  };

  return (
    <div className="mb-2 mt-4">
      <h2 className="font-size-16 px-3 px-md-3 px-lg-0">Add Address</h2>
      <DeliveryForm
        inputData={inputData}
        handleChange={handleChange}
        validationErrors={validationErrors}
        autoComplete={autoComplete}
        setWrapperRef={setWrapperRef}
        handleSaveButton={handleSaveButton}
      />
    </div>
  );
};

export default connect(null,
  { sendUserAddress: postUserData }
)(Delivery);

Delivery.propTypes = {
  sendUserAddress: PropTypes.func.isRequired,
};

DeliveryForm.propTypes = {
  inputData: PropTypes.objectOf(any).isRequired,
  handleChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.bool.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
  handleSaveButton: PropTypes.func.isRequired,
  validationErrors: PropTypes.objectOf(any).isRequired
};
