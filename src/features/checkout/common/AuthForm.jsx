import React from 'react';

import Field from 'Components/input/Field';
import Address from './Address';

const AuthForm = ({
  inputData,
  autoComplete,// eslint-disable-line
  inputField,
  handleChange,
  errors
}) =>
  inputField.map(propData => (
    <div className={propData.containerClassNames} key={propData.name}>
      <label
        htmlFor={propData.id}
        className={inputData[propData.name] ? 'fly-over m-0' : 'no-label'}
      >
        {propData.placeholderText}
      </label>
      {propData.name !== 'address' && <Field.Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        value={inputData[propData.name]}
        placeholderText={propData.placeholderText}
        id={propData.id}
        onFocus={() => {}}
      />}
      {propData.name === 'address' && (
        <Address propData={propData} handleInputChange={handleChange} />
      )}
      <span className="text-danger font-size-11">{errors[propData.name]}</span>
    </div>
  ));

export default AuthForm;
