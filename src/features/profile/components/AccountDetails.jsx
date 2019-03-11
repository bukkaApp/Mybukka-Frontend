import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import verifyToken from 'Utils/verifyToken';
import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from './Addresses';
// import Payment from './Payment';
import PasswordSection from './PasswordSection';
import { validateAField, validateAllFields } from '../validations/validateFields';
import signUpDomStructure from './signUpDomStructure.json';
import './accountDetails.scss';

const AccountDetails = ({ userInfo, loading, editUserData, userAddress }) => {
  const [activeInput, setActiveInput] = useState('firstName');
  const textInputFocus = {
    firstName: React.createRef(),
    lastName: React.createRef(),
    email: React.createRef(),
    contactMobile: React.createRef(),
    password: React.createRef(),
  };

  const [inputStatus, setInputStatus] = useState({
    firstName: 'save',
    lastName: 'save',
    email: 'save',
    contactMobile: 'save',
    password: 'save',
  });

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
    password: '',
  });

  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: '',
    password: ''
  };

  const handleAccountDetails = ({ target: { name, value } }) => {
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

  const validateOnClick = (newValidationError) => {
    setValidationErrors({
      ...validationErrors,
      ...newValidationError
    });
  };

  const handleEditButton = (e, inputName) => {
    e.preventDefault();
    // set selector for calling focus on input field in componenDidMount
    if (!loading) {
      setActiveInput(inputName);
      // set input status of a particular field to edit
      setInputStatus({
        ...inputStatus,
        [inputName]: 'edit'
      });
    }
  };

  const handleSaveButton = (inputName) => {
    setInputStatus({
      ...inputStatus,
      [inputName]: 'save'
    });
  };

  const handleInputSaveButton = (event, name) => {
    event.preventDefault();
    const data = {
      ...userInfo,
      [name]: inputData[name]
    };
    const isPasswordCheck = name === 'password';
    const validation = isPasswordCheck ? validateAllFields(data, true) : validateAllFields(data);
    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      handleSaveButton(name);
      const token = localStorage.getItem('x-access-token');
      const { slug } = verifyToken(token);
      setInputData({
        ...inputData,
        ...defaultData
      });
      // if token expires re-login
      return editUserData(`/user/${slug}`, data);
    }
  };

  useEffect(() => {
    if (inputStatus[activeInput] === 'edit') {
      textInputFocus[activeInput].current.focus();
    }
  });

  const address = userAddress.newAddress.address || '1, Aminu street, Mende';
  return (
    <div className="account-details">
      <AccountDetailsGroupHeader text="Account Details" />
      {signUpDomStructure.map(propData => (
        <AccountDetailsSection
          inputRef={textInputFocus[propData.name]}
          handleChange={handleAccountDetails}
          placeHolder={propData.placeholder}
          name={propData.name}
          key={propData.name}
          status={inputStatus[propData.name]}
          defaultValue={userInfo[propData.name]}
          handleEdit={event => handleEditButton(event, propData.name)}
          handleSave={event => handleInputSaveButton(event, propData.name)}
        />
      ))}
      <PasswordSection
        handleChange={handleAccountDetails}
        inputRef={textInputFocus.password}
        status={inputStatus.password}
        handleEdit={event => handleEditButton(event, 'password')}
        handleSave={event => handleInputSaveButton(event, 'password')}
      />
      <Addresses addresses={[address]} />
      {/* <Payment /> */}
    </div>
  );
};

export default AccountDetails;

AccountDetails.defaultProps = {
  userAddress: {}
};

AccountDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  editUserData: PropTypes.func.isRequired,
  userAddress: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.string),
      PropTypes.string
    ])
  )
};
