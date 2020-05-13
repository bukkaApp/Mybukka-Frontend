import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountDetailsSection from '../common/AccountDetailsSection';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from './Addresses';
// import Payment from './Payment';
import PasswordSection from './PasswordSection';
import { validateAField, validateAllFields }
  from '../validations/validateFields';
import signUpDomStructure from './signUpDomStructure.json';
import './accountDetails.scss';

const AccountDetails = ({
  userInfo,
  loading,
  editUserData,
  deleteUserAddress,
  requestUserAddress,
  requestUserData,
  userAddress,
  errorMessage,
}) => {
  const [activeInput, setActiveInput] = useState('firstName');
  const textInputFocus = {
    firstName: React.createRef(),
    lastName: React.createRef(),
    email: React.createRef(),
    contactMobile: React.createRef(),
    password: React.createRef()
  };

  const [inputStatus, setInputStatus] = useState({
    firstName: 'save',
    lastName: 'save',
    email: 'save',
    contactMobile: 'save',
    password: 'save'
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
    password: ''
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

  const handleEmailErrorMsg = (name) => {
    if (name === 'email' && !validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: errorMessage
      });
    }
  };

  const handleDeleteButton = async (address) => {
    // eslint-disable-next-line no-underscore-dangle
    const id = address._id;
    await deleteUserAddress(`/user/address/${id}`);
    await requestUserAddress('/user/address');
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

  const handleInputSaveButton = async (event, name) => {
    event.preventDefault();
    const data = {
      ...userInfo,
      [name]: inputData[name]
    };
    let validation = validateAllFields(data);
    if (name === 'password') {
      validation = validateAllFields(data, true);
    }
    const { errors, passes } = validation;
    validateOnClick(errors);
    if (passes) {
      handleSaveButton(name);
      setInputData({
        ...inputData,
        ...defaultData
      });
      // if token expires re-login
      await editUserData('/user/profile', data);
      await requestUserData('/user/profile');
      handleEmailErrorMsg(name);
    }
  };

  useEffect(() => {
    setInputData({
      ...inputData,
      ...userInfo,
    });
  }, [userInfo]);

  useEffect(() => {
    if (inputStatus[activeInput] === 'edit') {
      textInputFocus[activeInput].current.focus();
    }
  }, [textInputFocus[activeInput]]);

  return (
    <div className="account-details">
      <AccountDetailsGroupHeader text="Account Details" />
      {signUpDomStructure.map(propData => (
        <AccountDetailsSection
          errorMessage={validationErrors[propData.name]}
          ref={textInputFocus[propData.name]}
          handleChange={handleAccountDetails}
          placeHolder={propData.placeholder}
          name={propData.name}
          key={propData.name}
          status={inputStatus[propData.name]}
          value={inputData[propData.name]}
          handleEdit={event => handleEditButton(event, propData.name)}
          handleSave={event => handleInputSaveButton(event, propData.name)}
        />
      ))}
      <PasswordSection
        handleChange={handleAccountDetails}
        ref={textInputFocus.password}
        status={inputStatus.password}
        handleEdit={event => handleEditButton(event, 'password')}
        handleSave={event => handleInputSaveButton(event, 'password')}
      />
      <Addresses handleDelete={handleDeleteButton} addresses={userAddress} />
      {/* <Payment /> */}
    </div>
  );
};

export default AccountDetails;

const proptypes = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.string
      ])
    ),
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
);

AccountDetails.defaultProps = {
  errorMessage: ''
};

AccountDetails.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  requestUserAddress: PropTypes.func.isRequired,
  deleteUserAddress: PropTypes.func.isRequired,
  requestUserData: PropTypes.func.isRequired,
  editUserData: PropTypes.func.isRequired,
  userAddress: PropTypes.oneOfType([
    PropTypes.arrayOf(proptypes),
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.arrayOf(proptypes)
      ])
    )
  ]).isRequired
};
