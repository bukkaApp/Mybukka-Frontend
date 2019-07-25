import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';
import InputField from 'Components/input/InputField';
import AuthService from 'Utilities/authServices';

const AuthForm = ({ handleSubmit, handleChange, errors }) => {
  return (
    <>
      <h3>Add your phone number</h3>
      <div className="sub-text">
        <div className="p">Please verify your phone number</div>
        <div className="p">for your account</div>
        <div className="p bold">{AuthService.getEmail()}</div>
      </div>
      <div className="input-section">
        <div className="form-group">
          <div className="space">
            <div className="d-flex">
              <div className="p mt-2 prefix">+234</div>
              <InputField
                name="contactMobile"
                classNames="default-input"
                type="text"
                placeholderText="phone"
                handleChange={handleChange}
                error={errors['contactMobile']}
                handleFocus={() => {}}
              />
            </div>
            <small className="text-danger error-margin-left">
              {errors['contactMobile']}
            </small>
          </div>
        </div>
        <Button variant="primary" onClick={handleSubmit}>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Submit
        </Button>
      </div>
    </>
  );
};

AuthForm.defaultProps = {
  error: {},
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
};

export default AuthForm;
