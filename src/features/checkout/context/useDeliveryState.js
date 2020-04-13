import { useState, useMemo } from 'react';
import authServices from 'Utilities/authServices';
import { validateAField, validateAllFields } from '../validation/validateField';


const useDeliveryState = (description) => {
  const [deliveryAddressData, setDeliveryAddressData] = useState({
    address: description || '',
    deliveryInstructions: '',
    name: authServices.getFullName(),
    mobileNumber: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    address: '',
    deliveryInstructions: '',
    name: '',
    mobileNumber: ''
  });


  const handleDeliveryAddress = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setDeliveryAddressData({
      ...deliveryAddressData,
      ...newFieldData
    });
    setValidationErrors({
      ...validationErrors,
      [name]: validation.message
    });
  };

  const handleDeliveryAddressSave = (e) => {
    e.preventDefault();
    const validation = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...validation
    });
  };

  const validateAddress = () => {
    const { errors, passes } = validateAllFields(deliveryAddressData);
    setValidationErrors({
      ...validationErrors,
      ...errors
    });
    return passes;
  };

  return useMemo(() => ({
    useDeliveryData: [deliveryAddressData, setDeliveryAddressData],
    useDeliveryValidation: [validationErrors, setValidationErrors],
    handleDeliveryAddress,
    handleDeliveryAddressSave,
    validateAddress,
  }),
  [deliveryAddressData, setDeliveryAddressData, validationErrors, setValidationErrors]);
};

export default useDeliveryState;
