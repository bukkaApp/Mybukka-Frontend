import React from 'react';

import PropTypes from 'prop-types';

import InputField from 'Components/input/InputField';

import EditTogglerButton from './EditTogglerButton';

import './inputAccountDetails.scss';

const InputAccountDetails = React.forwardRef(({
  placeHolder,
  name,
  type,
  value,
  children,
  handleChange,
  handleSave,
}, ref) => (
  <div className="input-acc-details-section">
    <form className="form-acc-details">
      <div className="form-group input-acc-details">
        {children || (
          <InputField
            type={type}
            placeholderText={placeHolder}
            classNames="input-acc-details"
            name={name}
            ref={ref}
            handleChange={handleChange}
            value={value}
          />
        )}
      </div>
      <EditTogglerButton handleClick={handleSave} text="SAVE" />
    </form>
  </div>
));

export default InputAccountDetails;

InputAccountDetails.defaultProps = {
  type: 'text',
  value: '',
  children: '',
  handleChange: () => {},
  handleSave: () => {}
};

InputAccountDetails.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func
};
