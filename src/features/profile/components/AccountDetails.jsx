import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputAccountDetails from '../common/InputAccountDetails';
import AccountDetailsGroupHeader from '../common/AccountDetailsGroupHeader';
import Addresses from './Addresses';
import Payment from './Payment';
import { validateAField } from '../validations/validateFields';
import fetchUserData from '../actionCreators/fetchUserData';
import decodeToken from '../../../helper/decodeToken';
import './accountDetails.scss';

const AccountDetails = ({ requestUserData, user, status }) => {
  const { authenticated } = status;
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactMobile: ''
  });

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('x-access-token', user.token);
      const { slug } = decodeToken(user.token);
      requestUserData(`/user/${slug}`);
      console.log('user, slug', user, slug);
    }
  });

  const handleAccountDetails = ({ target: { name, value } }) => {
    const newFieldData = { [name]: value };
    console.log(name, value);
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

  return (
    <div className="account-details">
      <AccountDetailsGroupHeader text="Account Details" />
      <InputAccountDetails
        handleChange={handleAccountDetails}
        placeHolder="First name"
        name="firstName"
      />
      <InputAccountDetails
        handleChange={handleAccountDetails}
        placeHolder="Last name"
        name="lastName"
      />
      <InputAccountDetails
        handleChange={handleAccountDetails}
        placeHolder="Email"
        name="email"
        type="email"
      />
      <InputAccountDetails
        handleChange={handleAccountDetails}
        placeHolder="Contact Mobile"
        name="contactMobile"
        type="number"
      />
      <Addresses addresses={['1, Aminu street, Mende']} />
      <Payment />
    </div>
  );
};

const mapStateToProps = ({
  authenticationReducer: { status, user },
  profileReducer: { userInfo, address }
}) => ({
  status,
  user,
  userInfo,
  address
});

export default connect(mapStateToProps,
  { requestUserData: fetchUserData }
)(AccountDetails);

AccountDetails.propTypes = {
  requestUserData: PropTypes.func.isRequired,
  status: PropTypes.objectOf(PropTypes.bool).isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
  ).isRequired
};
