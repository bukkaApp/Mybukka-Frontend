import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextArea from 'Components/input/TextArea';
import Button from 'Components/button/Button';
import inputField from './address.json';
import Form from '../form/Form';
import useApi from '../../shared/api';
import { validateAField, validateAllFields } from './validation';

// import fetchUserAddress from '../../features/profile/actionCreators/fetchUserAddress';
// import postUserAddress from '../../features/profile/actionCreators/postUserAddress';
import { useLocationContext } from '../../context/LocationContext';

import './AddressForm.scss';

const AddressForm = ({ errorMessage, withPadding, label }) => {
  const { API } = useApi();
  const { coordinates } = useLocationContext();
  const wrapperRef = React.createRef();
  const [autoComplete, setAutoComplete] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const [inputData, setInputData] = useState({
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  });

  const defaultData = {
    address: '',
    streetAddress2: '',
    name: '',
    mobileNumber: ''
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAutoComplete(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef.current]);

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
    if (name === 'address') {
      setAutoComplete(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apartmentNumber = inputData.streetAddress2;
    const validation = validateAllFields(inputData);
    const { errors, passes } = validation;
    setValidationErrors({ ...validationErrors, ...errors });
    if (passes) {
      const location = { type: 'Point', coordinates };
      const data = { ...inputData, apartmentNumber, location, };
      // reset back to default
      setInputData({ ...inputData, ...defaultData });
      await API.address.post(data);
    }
  };

  return (
    <div className={withPadding && 'mb-2 mt-4'}>
      {label && <h2 className="font-size-16 px-3 px-md-3 px-lg-0">{label}</h2>}
      <span className="text-danger font-size-11">{errorMessage}</span>
      <form ref={wrapperRef} className="border padding-20 mt-4">
        <Form
          inputData={inputData}
          inputField={inputField}
          handleChange={handleChange}
          errors={validationErrors}
          autoComplete={autoComplete}
        />
        <div className="form-group mb-4">
          <TextArea
            placeholderText="Add delivery instructuctions..."
            name="deliveryInstructions"
            classNames="instruction"
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

const mapStateToProps = ({
  updateUserAddressReducer: { errorMessage, posted },
}) => ({
  errorMessage,
  posted,
});

export default connect(mapStateToProps,)(AddressForm);

AddressForm.defaultProps = {
  errorMessage: '',
  posted: false
};

AddressForm.propTypes = {
  errorMessage: PropTypes.string,
};
