import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputAccountDetails from './InputAccountDetails';
import PlainAccountDetails from './PlainAccountDetails';
import ErrorDisplaySection from './ErrorDisplaySection';

const AccountDetailsSection = React.createRef(({
  placeHolder,
  name,
  type,
  status,
  value,
  handleSave,
  handleChange,
  handleEdit,
  errorMessage,
}, ref) => (
  <Fragment>
    {status === 'edit' ? (
      <Fragment>
        <InputAccountDetails
          handleChange={handleChange}
          placeHolder={placeHolder}
          name={name}
          type={type}
          ref={ref}
          value={value}
          handleSave={handleSave}
        />
        <ErrorDisplaySection errorMessage={errorMessage} />
      </Fragment>
    ) : (
      <PlainAccountDetails
        altText={placeHolder}
        text={value}
        handleEdit={handleEdit}
      />
    )}
  </Fragment>
));

export default AccountDetailsSection;

AccountDetailsSection.defaultProps = {
  type: 'text',
  value: '',
  children: '',
  status: '',
  errorMessage: '',
  handleChange: () => {},
  handleSave: () => {},
  handleEdit: () => {},
};

AccountDetailsSection.propTypes = {
  errorMessage: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  status: PropTypes.string,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
};
