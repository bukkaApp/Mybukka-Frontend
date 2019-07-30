import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextArea from 'Components/input/TextArea';

import SelectQuantityButtons from './SelectQuantityButtons';

import './specialInstructions.scss';

const TextLengthSection = ({ length }) => (
  <div className="text-length-section">
    <h5 className="text-length-indicator">{length}/200</h5>
  </div>
);

const SpecialInstructions = () => {
  const [textLength, setTextLength] = useState(0);

  return (
    <div className="special-instructions-section">
      <div className="title-special-instruction-section">
        <h4 className="title-special-instruction">SPECIAL INSTRUCTIONS</h4>
      </div>
      <TextArea
        type="textarea"
        name="specialInstructions"
        maxLength={200}
        handleChange={event => setTextLength(event.target.value.length)}
        handleFocus={() => {}}
      />
      <TextLengthSection length={textLength} />
      <div className="d-lg-none quantity-toggler-md">
        <SelectQuantityButtons />
      </div>
    </div>
  );
};

export default SpecialInstructions;

TextLengthSection.defaultProps = {
  length: 0
};

TextLengthSection.propTypes = {
  length: PropTypes.number
};
