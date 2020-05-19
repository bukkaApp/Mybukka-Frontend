import React, { Fragment } from 'react';
import InputAccountDetails from './InputAccountDetails';
import PlainAccountDetails from './PlainAccountDetails';
import ErrorDisplaySection from './ErrorDisplaySection';

const AccountDetailsSection = React.forwardRef(({
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
          type={type || 'text'}
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
