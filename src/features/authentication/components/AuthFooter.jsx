import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
// import NavLink from 'Components/navlink/Navlink';
import Button from 'Components/button/Button';
import changeAuthenticationPageAction from 'Components/navbar/actionCreators/changeAuthenticationPage';
import './authfooter.scss';

const signUpTextOption = 'Already have an account?';

const signInTextOptions = 'New to Bukka?';

const AuthFooter = ({
  title,
  changeAuthenticationPage,
}) => {
  const { push, location } = useHistory();
  const path = location.pathname;
  const isLoginOrSignUp = path === '/login' || path === '/signup';
  const isMobileScreen = useMediaQuery({ minWidth: 767 });
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    changeAuthenticationPage(id);
  };

  const formType = title === 'Sign Up';
  const AltOption = (
    <div className="form-options padding">
      <p>{formType ? signUpTextOption : signInTextOptions}</p>
      <Button
        id={formType ? '/login' : '/signup'}
        type="button"
        handleClick={isMobileScreen && !isLoginOrSignUp ? goToAuthRoute : navigateToAuth}
        classNames="btn-link auth-footer-btn"
        text={formType ? 'LOG IN' : 'SIGN UP'}
      />
    </div>
  );
  return AltOption;
};

export default connect(null, {
  changeAuthenticationPage: changeAuthenticationPageAction
})(AuthFooter);

AuthFooter.defaultProps = {
  title: 'Sign Up'
};

AuthFooter.propTypes = {
  title: PropTypes.string
};

