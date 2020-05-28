import React, { Fragment, useState, useEffect } from 'react';
import InputAccountDetails from './InputAccountDetails';
import PlainAccountDetails from './PlainAccountDetails';
import ErrorDisplaySection from './ErrorDisplaySection';

const AccountDetailsSection = ({
  placeHolder,
  name,
  type,
  value,
  handleSave,
  handleChange,
  errorMessage,
}) => {
  const inpRef = React.createRef();
  const [state, setState] = useState(false);

  const handleSubmit = () => {
    handleSave();
    setState(false);
  };

  useEffect(() => {
    if (state) inpRef.current.focus();
  }, [state]);

  return (
    <Fragment>
      {state ? (
        <Fragment>
          <InputAccountDetails
            handleChange={handleChange}
            placeHolder={placeHolder}
            name={name}
            type={type || 'text'}
            ref={inpRef}
            value={value}
            handleSave={handleSubmit}
          />
          <ErrorDisplaySection errorMessage={errorMessage} />
        </Fragment>
      ) : (
        <PlainAccountDetails
          altText={placeHolder}
          text={value}
          handleEdit={() => setState(prev => !prev)}
        />
      )}
    </Fragment>
  );
};

export default AccountDetailsSection;
