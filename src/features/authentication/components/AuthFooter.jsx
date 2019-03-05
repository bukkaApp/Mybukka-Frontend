import React from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// import NavLink from 'Components/navlink/Navlink';
import Button from 'Components/button/Button';
import './authfooter.scss';

const signUpTextOption = 'Already have an account?';

const signInTextOptions = 'New to Bukka?';

const AuthFooter = ({
  title,
  history: { push }
}) => {
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };


  const btnAttribute = { handleClick: navigateToAuth };

  const formType = title === 'Sign Up';
  const AltOption = (
    <div className="form-options padding">
      <p>{formType ? signUpTextOption : signInTextOptions}</p>
      <Button
        id={formType ? '/login' : '/signup'}
        type="button"
        {...btnAttribute}
        classNames="btn-link auth-footer-btn"
        text={formType ? 'LOG IN' : 'SIGN UP'}
      />
    </div>
  );
  return AltOption;
};

const AuthFooterComponent = withRouter(AuthFooter);

export default AuthFooterComponent;

AuthFooter.defaultProps = {
  title: 'Sign Up'
};

AuthFooter.propTypes = {
  title: PropTypes.string
};

