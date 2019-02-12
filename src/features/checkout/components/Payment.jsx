import React, { useState } from 'react';
import Button from 'Components/button/Button';
import
{ validateAField, validateAllFields }
  from '../validation/validateField';
import CheckBox from '../common/CheckBoxBtn';
import inputFeild from '../InputAttribute/inputData.json';
import './payment.scss';
import AuthForm from '../common/AuthForm';

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
    <section className="container mb-2 mt-4">
      <h2 className="font-size-16">Payment</h2>
      <form className="border padding-20 mt-4" action="">
        <div className="row font-size-14">
          <AuthForm
            inputData={inputData}
            inputField={inputFeild.payment}
            handleChange={handleChange}
            errors={validationErrors}
          />
        </div>

        <div className="form-group checkbox-form-group">
          <CheckBox />
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

    </section>
  );
};

export default Payment;
