/* eslint-disable react/prop-types */
import React from 'react';
import Input from 'Components/input/InputField'; // eslint-disable-line
import './textField.scss';


const HelpBlock = ({ touched, matched, errorMsg }) => (
  touched && !matched &&
    <div className="text-danger help-block">
      {errorMsg}
    </div>
);

/**
 * @description textField
 * @function textField
 * @param {*} props
 * @returns {JSX} jsx
 */
const textField = ({ handleChange, inputData }) => (
  Object.keys(inputData).map(el => (
    <div className="form-group has-error padding" key={el}>
      <Input
        name={el}
        classNames={'form-control form-input'}
        type={inputData[el].type}
        handleFocus={() => {}}
        placeholderText={inputData[el].placeholder}
        handleChange={handleChange}
      />
      <HelpBlock
        touched={inputData[el].touched}
        matched={inputData[el].match}
        errorMsg={inputData[el].touched && !inputData[el].value ?
          inputData[el].errorMsg.empty : inputData[el].errorMsg.invalid}
      />
    </div>
  ))
);

export default textField;
