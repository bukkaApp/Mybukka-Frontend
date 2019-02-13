import React from 'react';
import Input from 'Components/input/InputField';
import SuggestionsDropdown from 'Components/common-navs/SuggestionsDropdown';

const AuthForm =
({ inputData, autoComplete, inputField, handleChange, errors }) => (
  inputField.map(propData => (
    <div className={propData.containerClassNames}>
      <label
        htmlFor={propData.id}
        className={inputData[propData.name] ? 'fly-over m-0' : 'no-label'}
      >
        {propData.placeholderText}
      </label>
      <Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        placeholderText={propData.placeholderText}
        id={propData.id}
      />
      {(propData.name === 'streetAddress1' && autoComplete)
      && <SuggestionsDropdown handleClick={() => {}} />}
      <span
        className="text-danger font-size-11"
      >
        {errors[propData.name]}
      </span>
    </div>
  ))
);

export default AuthForm;
