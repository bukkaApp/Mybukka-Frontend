import React from 'react';

import Navlink from 'Components/navlink/Navlink';
import PropTypes from 'prop-types';
import './personalizedhelp.scss';

const PersonalizedHelp = ({ authenticated }) => {
  if (authenticated) {
    return null;
  }
  return (
    <div className="col-md-6 pl-0">
      <div>
        <div className="personalized-text" data-cy="login-prompt-title">
          Log in for personalized help
        </div>
        <div className="personalized-btn-wrapper">
          <Navlink
            href="/login?next=/support?cs_web_redirect=/buyer"
          >
            <div className="personalized-login-btn" data-cy="page-button">
              <div className="personalized-btn-text">
                <span>Log in</span>
              </div>
            </div>
          </Navlink>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHelp;

PersonalizedHelp.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
