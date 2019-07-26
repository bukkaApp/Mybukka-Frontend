import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import Button from 'Components/button/Button';
import swal from 'sweetalert';

const CodeForm = ({
  handleSubmit,
  sent,
  errors,
  handleChange,
  inputData,
  errorMessage,
}) => {
  if (errorMessage !== '') swal(errorMessage);

  return (
    <>
      <h5 className="text-center">
        A code has been sent to {`+234${inputData.contactMobile}`}
      </h5>
      <div className="sub-text">
        <div className="p">Please type the code in the input field below</div>
      </div>
      <div>
        <div className="mt-3 mb-3">
          <input
            type="text"
            name="code"
            placeholder="Enter code..."
            onChange={handleChange}
            className="form-control"
          />
          <small className="text-danger error-margin-left">
            {errors['code']}
          </small>
        </div>
        <Button
          type="button"
          handleClick={handleSubmit}
          classNames="primary-button w-100"
        >
          <>
            {sent ? (
              <Spinner
                as="span"
                aria-hidden="true"
                animation="border"
                variant="light"
              />
            ) : (
              'Verify'
            )}
          </>
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
  sent: PropTypes.bool.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  inputData: PropTypes.objectOf(PropTypes.string).isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default CodeForm;
