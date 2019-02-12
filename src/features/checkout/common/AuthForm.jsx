import React from 'react';
import Input from 'Components/input/InputField';

const AuthForm =
({ inputData, inputField, handleChange, errors }) => (
  inputField.map(propData => (
    <div className={propData.containerClassNames}>
      <label
        htmlFor={propData.id}
        className={inputData[propData.name] ? 'fly-over m-0' : 'no-label'}
      >
        {propData.placeholderText}
      </label>
      <Input
        autocomplete="off"
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        placeholderText={propData.placeholderText}
        id={propData.id}
      />
      <span
        className="text-danger font-size-11"
      >
        {errors[propData.name]}
      </span>
    </div>
  ))
);

export default AuthForm;
