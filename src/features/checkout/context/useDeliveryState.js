import { useState, useMemo, useEffect } from 'react';
import { validateAField, validateAllFields } from '../validation/validateField';
import { useUserContext } from '../../../context/UserContext';


const useDeliveryState = () => {
  const { user } = useUserContext();
  const [deliveryAddressData, setDeliveryAddressData] = useState({
    address: '',
    deliveryInstructions: '',
    name: '',
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

  useEffect(() => {
    if (user) {
      setDeliveryAddressData({
        ...deliveryAddressData,
        name: `${user.firstName} ${user.lastName}`
      });
    }
  }, [user]);

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
