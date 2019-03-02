import React from 'react';

import PropTypes from 'prop-types';

import NavLink from 'Components/navlink/Navlink';
import './termsandconditions.scss';

const TermsAndConditions = ({ title }) => {
  if (title === 'Sign Up') {
    return (
      <div className="col-lg-12 padding terms">
        <p>
            By clicking the Sign Up or Facebook button, you agree to our{' '}
          <NavLink classNames="link" href="/" text="Terms of Service " />
            and <NavLink classNames="link" href="/" text="Privacy Policy" />.
        </p>
      </div>
    );
  }
  return null;
};

export default TermsAndConditions;

TermsAndConditions.defaultProps = {
  title: 'Sign Up'
};

TermsAndConditions.propTypes = {
  title: PropTypes.string
};
