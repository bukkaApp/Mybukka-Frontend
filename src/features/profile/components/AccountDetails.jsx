import React, { useState } from 'react';
import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from './Addresses';
import Payment from './Payment';
import PasswordSection from './PasswordSection';
import { validateAField } from '../validations/validateFields';
import useApi from '../../../shared/api';
import signUpDomStructure from './signUpDomStructure.json';
import './accountDetails.scss';

const AccountDetails = ({ userInfo, setProfile }) => {
  const { API } = useApi();
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: '',
    address: '',
    apartmentNumber: '',
    name: '',
    mobileNumber: '',
    deliveryInstructions: '',
    location: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: ''
  });

  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: ''
  };

  const handleChange = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    const validation = validateAField(newFieldData, name);
    setInputData({ ...inputData, ...newFieldData });
    setValidationErrors({ ...validationErrors, [name]: validation.message });
  };

  const handleSubmit = async (event, name) => {
    if (event) event.preventDefault();
    const updateField = { [name]: inputData[name] };
    const validation = validateAField(updateField, name);
    setValidationErrors({ ...defaultData, [name]: validation.message });
    if (validation.message === '') {
      const reponse = await API.profile.patch(null, updateField);
      setProfile(reponse.data.updatedUser);
      setInputData({ ...inputData, ...defaultData });
    }
  };

  return (
    <div className="account-details">
      <AccountDetailsGroupHeader text="Account Details" />
      {signUpDomStructure.map(propData => (
        <AccountDetailsSection
          errorMessage={validationErrors[propData.name]}
          handleChange={handleChange}
          placeHolder={propData.placeholder}
          name={propData.name}
          key={propData.name}
          value={inputData[propData.name] || userInfo[propData.name]}
          handleSave={event => handleSubmit(event, propData.name)}
        />
      ))}
      <PasswordSection
        handleChange={handleChange}
        errorMessage={validationErrors.password}
        value={inputData.password}
        handleSave={event => handleSubmit(event, 'password')}
      />
      <Addresses />
      <Payment />
    </div>
  );
};

export default AccountDetails;
