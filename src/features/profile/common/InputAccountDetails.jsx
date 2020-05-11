import React from 'react';

import Field from 'Components/input/Field';

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
          <Field.Input
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
