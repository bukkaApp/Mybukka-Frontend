import React from 'react';

import PropTypes from 'prop-types';

import InputField from 'Components/input/InputField';

import EditTogglerButton from './EditTogglerButton';

import './inputAccountDetails.scss';

const InputAccountDetails = ({
  placeHolder,
  name,
  type,
  defaultValue,
  children,
}) => (
  <div className="input-acc-details-section">
    <form className="form-acc-details">
      <div className="form-group input-acc-details">
        {children || (
          <InputField
            type={type}
            placeholderText={placeHolder}
            classNames="input-acc-details"
            name={name}
            handleChange={() => {}}
            defaultValue={defaultValue}
          />
        )}
      </div>
      <EditTogglerButton text="EDIT" />
    </form>
  </div>
);

export default InputAccountDetails;

InputAccountDetails.defaultProps = {
  type: 'text',
  defaultValue: '',
  children: '',
};

InputAccountDetails.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  children: PropTypes.node,
};
