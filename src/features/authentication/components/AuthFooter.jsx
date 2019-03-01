import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import NavLink from 'Components/navlink/Navlink';
import Button from 'Components/button/Button';
import navAuthentication from 'Components/navbar/actionCreators/navAuthentication';
import './authfooter.scss';

const signUpTextOption = 'Already have an account?';

const signInTextOptions = 'New to Bukka?';

const AuthFooter = ({
  title,
  navigateToNextRoute,
  location,
  history: { push }
}) => {
  const navigateToAuth = ({ target: { id } }) => {
    push(id);
  };

  const goToAuthRoute = ({ target: { id } }) => {
    navigateToNextRoute(id);
  };

  const minWidth = window.innerWidth;
  let btnAttribute = { handleClick: navigateToAuth };
  if (minWidth > 767) {
    if (location.pathname.match('/login')
        || location.pathname.match('/signup')) {
      btnAttribute = {
        dataToggle: 'modal',
        dataTarget: '#modal',
        handleClick: goToAuthRoute
      };
    } else {
      btnAttribute = {
        handleClick: goToAuthRoute
      };
    }
  }

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

export default connect(null, {
  navigateToNextRoute: navAuthentication
})(AuthFooterComponent);

AuthFooter.defaultProps = {
  title: 'Sign Up'
};

AuthFooter.propTypes = {
  title: PropTypes.string
};

