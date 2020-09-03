import React from 'react';

import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import './authfooter.scss';

const signUpTextOption = 'New to Bukka?';

const CreateAccount = ({
  push
}) => {
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  return (
    <div className="form-options padding">
      <p>{signUpTextOption}</p>
      <Button
        id="/signup"
        type="button"
        handleClick={navigateToAuth}
        classNames="btn-link auth-footer-btn"
        text="SIGN UP"
      />
    </div>
  );
};

export default CreateAccount;

CreateAccount.defaultProps = {
  push: () => {},
};

CreateAccount.propTypes = {
  push: PropTypes.func,
};

