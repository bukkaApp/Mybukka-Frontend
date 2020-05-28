import React, { useState } from 'react';

import TextArea from 'Components/input/TextArea';
import Button from 'Components/button/Button';
import inputField from './address.json';
import Form from '../form/Form';
import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './validation';

import { useLocationContext } from '../../context/LocationContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';

import './AddressForm.scss';

const AddressForm = ({ withPadding, label, withModal, handleClick }) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setAddress, address } = useUserContext();
  const { coordinates, selectedLocation } = useLocationContext();
  const wrapperRef = React.createRef();
  const [errorMessage, setErrorMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const [inputData, setInputData] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const defaultData = {
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apartmentNumber = inputData.streetAddress2;
    const validation = validateAllFields(inputData);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) {
      const location = { type: 'Point', coordinates };
      const data = { ...inputData, apartmentNumber, location, address: selectedLocation.description };
      // reset back to default
      setInputData({ ...inputData, ...defaultData });
      try {
        loading('ADDRESS', true);
        const response = await API.address.post(data);
        const prevAddress = address || [];
        setAddress([...prevAddress, response.data.newAddress]);
        if (withModal) handleClick();
      } catch (error) {
        setErrorMessage(error.response.data.message || '');
        loading('ADDRESS', false);
      }
    }
  };

  return (
    <div className={withPadding && 'mb-2 mt-4'}>
      {label && <h2 className="font-size-16 px-3 px-md-3 px-lg-0">{label}</h2>}
      <span className="text-danger font-size-11">{errorMessage}</span>
      <form ref={wrapperRef} className="border padding-20 mt-4">
        <Form
          inputData={inputData}
          inputField={inputField}
          handleChange={handleChange}
          errors={validationErrors}
        />
        <div className="form-group mb-4">
          <TextArea
            placeholderText="Add delivery instructuctions..."
            name="deliveryInstructions"
            handleChange={handleChange}
            onFocus={() => {}}
          />
        </div>
        <div>
          <Button
            type="button"
            text="Save"
            classNames="small-button-save"
            handleClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressForm;

AddressForm.propTypes = {};
