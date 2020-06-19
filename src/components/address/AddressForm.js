/* eslint-disable max-len */
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
import { useFormReportContext } from '../../context/FormReportContext';
import { useModalContext } from '../../context/ModalContext';
// import { useAddresContext } from '../../context/AddressContext';

const AddressForm = ({ withPadding, label, withModal, handleClick, withFormSpace }) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setAddress } = useUserContext();

  const { addressFormPopup, } = useModalContext();
  const { setAddressReport, requestAddressValidity, resetAddressReport, updateAddressData, changeAddress, address } = useFormReportContext();

  const { coordinates, selectedLocation } = useLocationContext();
  const wrapperRef = React.createRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: '',
    location: '',
  });

  const [inputData, setInputData] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: '',
    location: null
  });

  useEffect(() => {
    if (changeAddress) setInputData({ ...inputData, ...address });
  }, [changeAddress, addressFormPopup]);

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

  const resolveLocationError = errors => ({
    address: !errors.address && errors.location ? 'select address from the location dropdown' : (errors.address || '')
  });

  const onBlur = (e, data) => {
    if (data) setInputData(data);
    updateAddressData(data || inputData);
    const dataToValidate = data || inputData;
    const validation = validateAllFields({ ...dataToValidate, location: dataToValidate.location ? true : null });

    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors, ...resolveLocationError(errors) });
    setAddressReport({ res: passes, change: true });
  };

  useEffect(() => {
    if (!inputData.address) return;
    const location = { type: 'Point', coordinates };

    const data = { ...inputData, address: selectedLocation.description, location };
    onBlur(null, data);
  }, [selectedLocation, coordinates]);

  useEffect(() => {
    if (!requestAddressValidity) return;
    onBlur();
  }, [requestAddressValidity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateAllFields({ ...inputData, location: inputData.location ? true : null });

    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors, ...resolveLocationError(errors) });
    if (passes) {
      try {
        loading(true);
        const response = await API.address.post({ ...inputData, apartmentNumber: inputData.streetAddress2 });
        setAddress(response.data.newAddress);
        resetAddressReport();
        loading(false);
        if (withModal) handleClick();
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : error.message);
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
          onBlur={onBlur}
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
          <Button
            type="button"
            text="Okay"
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
