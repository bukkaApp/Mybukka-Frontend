import React from 'react';

import PropTypes from 'prop-types';

import Field from 'Components/input/Field';

import './textField.scss';

const HelpBlock = ({ errorMsg }) => (
  <div className="text-danger help-block">{errorMsg}</div>
);

const TextField = ({ handleChange, domStructure, validationErrors, inputData }) =>
  domStructure.map(structure => (
    <div className="form-group padding" key={structure.id}>
      <Field.Input
        value={inputData[structure.name]}
        name={structure.name}
        classNames="Secondary-Input pl-0"
        type={structure.type}
        placeholderText={structure.placeholder}
        handleChange={handleChange}
        onFocus={() => {}}
      />
      <HelpBlock errorMsg={validationErrors[structure.name]} />
    </div>
  ));

export default TextField;

HelpBlock.defaultProps = {
  errorMsg: ''
};

HelpBlock.propTypes = {
  errorMsg: PropTypes.string,
};
