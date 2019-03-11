import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputAccountDetails from './InputAccountDetails';
import PlainAccountDetails from './PlainAccountDetails';

const AccountDetailsSection = ({
  placeHolder,
  name,
  type,
  status,
  defaultValue,
  handleSave,
  handleChange,
  handleEdit,
  inputRef
}) => (
  <Fragment>
    {status === 'edit' ? (
      <InputAccountDetails
        handleChange={handleChange}
        placeHolder={placeHolder}
        name={name}
        type={type}
        inputRef={inputRef}
        defaultValue={defaultValue}
        handleSave={handleSave}
      />
    ) : (
      <PlainAccountDetails altText={placeHolder} text={defaultValue} handleEdit={handleEdit} />
    )}
  </Fragment>
);

export default AccountDetailsSection;

AccountDetailsSection.defaultProps = {
  type: 'text',
  defaultValue: '',
  children: '',
  status: '',
  handleChange: () => {},
  handleSave: () => {},
  handleEdit: () => {},
  inputRef: () => {},
};

AccountDetailsSection.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  status: PropTypes.string,
  handleChange: PropTypes.func,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
