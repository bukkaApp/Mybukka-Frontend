import React from 'react';

import PropTypes from 'prop-types';

import InputField from 'Components/input/InputField';

import './textField.scss';

const HelpBlock = ({ errorMsg }) => (
  <div className="text-danger help-block">{errorMsg}</div>
);

const TextField = ({ handleChange, domStructure, validationErrors }) =>
  domStructure.map(structure => (
    <div className="form-group padding" key={structure.id}>
      <InputField
        name={structure.name}
        classNames="default-input"
        type={structure.type}
        placeholderText={structure.placeholder}
        handleChange={handleChange}
        handleFocus={() => {}}
      />
      <HelpBlock errorMsg={validationErrors[structure.name]} />
    </div>
  ));

export default TextField;

HelpBlock.defaultProps = {
  errorMsg: ''
};

HelpBlock.propTypes = {
  errorMsg: PropTypes.string
};
