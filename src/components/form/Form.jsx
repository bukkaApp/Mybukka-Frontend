import React from 'react';

import Field from 'Components/input/Field';
import PlacesSuggestion from '../places-suggest/SearchLocation';
import './Form.scss';

const AuthForm = ({
  inputData,
  inputField,
  handleChange,
  errors
}) =>
  inputField.map(propData => (
    <div className={propData.containerClassNames} key={propData.name}>
      {!propData.address &&
      <>
        <label
          htmlFor={propData.id}
          className={`font-size-14 ${inputData[propData.name] ? 'Fly--over m-0' : 'No--label'}`}
        >
          {propData.placeholderText}
        </label>
        <Field.Input
          autoComplete="off"
          type={propData.type}
          name={propData.name}
          handleChange={handleChange}
          classNames={`Primary-Input ${propData.classNames}`}
          placeholderText={propData.placeholderText}
          id={propData.id}
          value={inputData[propData.name]}
        />
      </>}
      {propData.address && (
        <PlacesSuggestion
          withLabel
          state={inputData[propData.name]}
          htmlFor={propData.id}
          name={propData.name}
          standalone
          emitOnChange={handleChange}
        />
      )}
      <small className="text-danger font-size-11">{errors[propData.name]}</small>
    </div>
  ));

export default AuthForm;
