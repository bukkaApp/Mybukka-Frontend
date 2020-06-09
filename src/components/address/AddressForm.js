import React, { useState, useEffect } from 'react';

import TextArea from '../input/TextArea';
import Button from '../button/Button';
import inputField from './address.json';
import Form from '../form/Form';
import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './validation';

import { useLocationContext } from '../../context/LocationContext';
import { useUserContext } from '../../context/UserContext';
import { useLoadingContext } from '../../context/LoadingContext';
import TemporaryWrapper from '../ViewWrappers/TemporaryWrapper';
import { useGlobalFormValidityRequestContext } from '../../context/GlobalFormValidityRequestContext';
import { useGlobalFormValidityReportContext } from '../../context/GlobalFormValidityReportContext';
import { useAddresContext } from '../../context/AddressContext';

const AddressForm = ({ withPadding, label, withModal, handleClick, withFormSpace }) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setAddress } = useUserContext();
  const { addressValidityReport, reportAddressValidity } = useGlobalFormValidityRequestContext();
  const { setAddressValidity } = useGlobalFormValidityReportContext();
  const { coordinates, selectedLocation } = useLocationContext();
  const wrapperRef = React.createRef();
  const [errorMessage, setErrorMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const [inputData, setInputData] = useAddresContext({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  useEffect(() => {
    if (!inputData.address) return;
    setInputData({ ...inputData, address: selectedLocation.description });
  }, [selectedLocation]);

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
    if (addressValidityReport) return reportAddressValidity(false);
  };

  const onSubmit = () => {
    if (!addressValidityReport) return;
    const validation = validateAllFields(inputData);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) return setAddressValidity(passes);
  };

  useEffect(() => {
    if (!addressValidityReport) return;
    return onSubmit();
  }, [addressValidityReport]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apartmentNumber = inputData.streetAddress2;
    const validation = validateAllFields(inputData);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) {
      const location = { type: 'Point', coordinates };
      const data = { ...inputData, apartmentNumber, location };
      try {
        loading(true);
        const response = await API.address.post(data);
        setAddress(response.data.newAddress);
        if (withModal) handleClick();
      } catch (error) {
        setErrorMessage(error.response.data.message || '');
        loading(false);
      }
    }
  };

  return (
    <div className={withPadding && 'mb-2 mt-4'}>
      {label && <TemporaryWrapper.ViewHeading noPadding text={label} />}
      <span className="text-danger font-size-11">{errorMessage}</span>
      <form ref={wrapperRef} id="address" className={`border padding-20 ${withFormSpace ? 'mt-2' : 'mt-4'}`}>
        <Form
          inputData={inputData}
          inputField={inputField}
          handleChange={handleChange}
          onBlur={onSubmit}
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
