import React, { useState } from 'react';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from '../../../components/address';
import Payment from '../../../components/payment';
import PlainParagraph from '../../../components/plain-paragraph/PlainParagraph';
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
    location: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: '',
  });

  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: '',
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
      {signUpDomStructure.map((propData) => (
        <PlainParagraph
          withForm
          errorMessage={validationErrors[propData.name]}
          handleChange={handleChange}
          placeHolder={propData.placeholder}
          withHeading={propData.withHeading}
          heading={propData.heading}
          name={propData.name}
          key={propData.name}
          buttonText="EDIT"
          value={inputData[propData.name] || userInfo[propData.name]}
          onClick={(event) => {
            event.stopPropagation();
            handleSubmit(event, propData.name);
          }}
        />
      ))}
      <Addresses useProfileStandard />
      <Payment useProfileStandard />
    </div>
  );
};

export default AccountDetails;
