import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

const CodeForm = ({ handleSubmit, errors, handleChange, inputData }) => {
  return (
    <>
      <h5>A code has been sent to {`+234${inputData.contactMobile}`}</h5>
      <div className="sub-text">
        <div className="p">Please type the code in the input field below</div>
      </div>
      <div>
        <div className="mt-3 mb-3">
          <input
            type="text"
            name="code"
            // value={inputData.code}
            placeholder="Enter code..."
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-danger error-margin-left">
            {errors['code']}
          </small>
        </div>
        <Button variant="primary" onClick={handleSubmit}>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Verify...
        </Button>
      </div>
    </>
  );
};

CodeForm.defaultProps = {
  error: {},
};

CodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  inputData: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CodeForm;
