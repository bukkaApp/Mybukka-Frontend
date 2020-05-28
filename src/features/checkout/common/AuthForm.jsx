import React from 'react';

import Field from 'Components/input/Field';

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
      <Field.Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        value={inputData[propData.name]}
        placeholderText={propData.placeholderText}
        id={propData.id}
        onFocus={() => {}}
      />
      <span className="text-danger font-size-11">{errors[propData.name]}</span>
    </div>
  ));

export default AuthForm;
