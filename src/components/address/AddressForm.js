/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

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
import './AddressForm.scss';

const AddressForm = ({ withPadding, label, withModal, handleClick, withFormSpace }) => {
  const { API } = useApi();
  const { loading } = useLoadingContext();
  const { setAddress } = useUserContext();
  const { pathname } = useLocation();

  const matchCheckoutScreen = matchPath(pathname, {
    path: '/merchant/:slug/checkout',
    exact: true,
    strict: false
  });

  const { addressFormPopup, setAddressFormPopup, setModal } = useModalContext();
  const { resetAddressReport, updateAddressData, changeAddress, address } = useFormReportContext();

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

  const onOkay = (e) => {
    e.preventDefault();
    const validation = validateAllFields({ ...inputData, location: inputData.location ? true : null });

    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors, ...resolveLocationError(errors) });
    if (passes) {
      updateAddressData(inputData);

      if (!addressFormPopup) return;
      setAddressFormPopup(false);
      setModal(false);
    }
  };

  useEffect(() => {
    if (changeAddress) {
      delete address.location;
      setInputData({ ...address });
      resetAddressReport();
    }
  }, [changeAddress, addressFormPopup]);

  const onBlur = (event, data) => {
    if (!addressFormPopup && matchCheckoutScreen) {
      let newFieldData;
      if (event) {
        newFieldData = { [event.target.name]: event.target.value };
        const validation = validateAField(newFieldData, event.target.name);
        setValidationErrors({ ...validationErrors, [name]: validation.message });
      }

      const dataToValidate = { ...inputData, ...data, ...newFieldData };
      const validation = validateAllFields({ ...dataToValidate, location: dataToValidate.location ? true : null });

      const { passes, errors } = validation;

      const hasMultiField = dataToValidate.address && dataToValidate.mobileNumber && dataToValidate.name;
      if (!event || hasMultiField) setValidationErrors({ ...validationErrors, ...errors, ...resolveLocationError(errors) });

      if (passes) updateAddressData(dataToValidate);
    }
  };

  useEffect(() => {
    if (!inputData.address) return;
    const location = { type: 'Point', coordinates };

    const data = { ...inputData, address: selectedLocation.description, location };
    setInputData(data);
    onBlur(null, data);
  }, [selectedLocation, coordinates]);

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
        <div className="Form-Button-Group">
          <Button
            type="button"
            text="Save"
            classNames="small-button-save"
            handleClick={handleSubmit}
          />
          {(addressFormPopup && matchCheckoutScreen) &&
          <Button
            type="button"
            text="Okay"
            classNames="small-button-save"
            handleClick={onOkay}
          />}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;

AddressForm.propTypes = {};
