import React from 'react';

import Field from 'Components/input/Field';
import SuggestionsDropdown from 'Components/places-suggest/SuggestionsDropdown';

const AuthForm = ({
  inputData,
  autoComplete,
  inputField,
  handleChange,
  errors
}) =>
  inputField.map(propData => (
    <div className={propData.containerClassNames} key={propData.name}>
      <label
        htmlFor={propData.id}
        className={`font-size-14 ${inputData[propData.name] ? 'fly-over m-0' : 'no-label'}`}
      >
        {propData.placeholderText}
      </label>
      <Field.Input
        inputElement={{ autoComplete: 'off' }}
        type={propData.type}
        name={propData.name}
        handleChange={handleChange}
        classNames={propData.classNames}
        placeholderText={propData.placeholderText}
        id={propData.id}
        onFocus={() => {}}
        value={inputData[propData.name]}
      />
      {propData.name === 'streetAddress1' && autoComplete && (
        <SuggestionsDropdown handleClick={() => {}} />
      )}
      <span className="text-danger font-size-11">{errors[propData.name]}</span>
    </div>
  ));

export default AuthForm;
