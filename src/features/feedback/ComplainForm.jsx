/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';

import './category.scss';
import '../support/components/supportmainsection.scss';


const HelpBlock = ({ errorMsg }) => (
  <div className="text-danger help-block">{errorMsg}</div>
);

const ComplainForm = ({
  handleClick, handleChange, validationErrors, inputData,
}) => (
  <form
    className="mx-3 mt-4"
    onSubmit={handleClick}
  >
    <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">Comment
        <span className="text-danger">*</span>
      </label>
      <textarea
        onChange={handleChange}
        className="form-control"
        name="content"
        id="exampleFormControlTextarea1"
        rows="3"
        value={inputData.content}
      />
      <HelpBlock errorMsg={validationErrors.content} />
    </div>
    <div className="form-group">
      <label htmlFor="firstName">First name
        <span className="text-danger">*</span>
      </label>
      <input
        onChange={handleChange}
        type="text"
        style={{ height: '50px' }}
        className="form-control"
        name="firstName"
        value={inputData.firstName}
        id="firstName"
      />
      <HelpBlock errorMsg={validationErrors.firstName} />
    </div>
    <div className="form-group">
      <label htmlFor="lastName">Last name
        <span className="text-danger">*</span>
      </label>
      <input
        onChange={handleChange}
        type="text"
        style={{ height: '50px' }}
        className="form-control"
        id="lastName"
        value={inputData.lastName}
        name="lastName"
      />
      <HelpBlock errorMsg={validationErrors.lastName} />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email<span className="text-danger">*</span></label>
      <input
        onChange={handleChange}
        type="email"
        style={{ height: '50px' }}
        className="form-control"
        id="email"
        value={inputData.email}
        name="email"
      />
      <HelpBlock errorMsg={validationErrors.email} />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">Phone number
        <span className="text-danger">*</span>
      </label>
      <div className="d-flex justify-content-between">
        <select
          className="form-control col-md-2 mr-2"
          id="exampleFormControlSelect1"
          style={{ height: '50px' }}
        >
          <option>NG (+234)</option>
        </select>
        <input
          type="text"
          style={{ height: '50px' }}
          className="form-control"
          id="contact"
          name="contact"
        />
      </div>
      <HelpBlock errorMsg={validationErrors.contact} />
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">Country
        <span className="text-danger">*</span>
      </label>
      <select
        className="form-control"
        id="exampleFormControlSelect1"
        style={{ height: '50px' }}
      >
        <option>Nigeria</option>
        <option>Ghana</option>
        <option>Benin</option>
      </select>
      <HelpBlock errorMsg={validationErrors.country} />
    </div>
    <div className="d-flex d-md-flex mt-5 mb-4 justify-content-center">
      <Button
        type="submit"
        text="Report issue"
        classNames="big-button send_complain_btn"
        id="charge-user-small"
        handleClick={() => {}}
      />
    </div>
  </form>
);

export default ComplainForm;

ComplainForm.defaultProps = {
  handleChange: () => {},
  handleClick: () => {},
  validationErrors: {
    name: ''
  },
  inputData: {
    name: '',
    firstName: '',
    lastName: ''
  },
};

ComplainForm.propTypes = {
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  inputData: PropTypes.arrayOf(PropTypes.string),
  validationErrors: PropTypes.objectOf(PropTypes.string),
};

HelpBlock.defaultProps = {
  errorMsg: ''
};

HelpBlock.propTypes = {
  errorMsg: PropTypes.string
};
