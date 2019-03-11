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
  handleChange,
  handleSave,
  inputRef
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
            inputRef={inputRef}
            handleChange={handleChange}
            defaultValue={defaultValue}
          />
        )}
      </div>
      <EditTogglerButton handleClick={handleSave} text="SAVE" />
    </form>
  </div>
);

export default InputAccountDetails;

InputAccountDetails.defaultProps = {
  type: 'text',
  defaultValue: '',
  children: '',
  handleChange: () => {},
  handleSave: () => {},
  inputRef: () => {},
};

InputAccountDetails.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  children: PropTypes.node,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};
