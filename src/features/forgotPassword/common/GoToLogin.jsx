import React from 'react';

import PropTypes from 'prop-types';
import Button from 'Components/button/Button';
import './authfooter.scss';

const signInTextOption = 'Already have an account?';

const GoToLogin = ({
  push
}) => {
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  return (
    <div className="form-options padding">
      <p>{signInTextOption}</p>
      <Button
        id="/login"
        type="button"
        handleClick={navigateToAuth}
        classNames="btn-link auth-footer-btn"
        text="LOG IN"
      />
    </div>
  );
};

export default GoToLogin;

GoToLogin.defaultProps = {
  push: () => { },
};

GoToLogin.propTypes = {
  push: PropTypes.func,
};

