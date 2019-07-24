import React from 'react';

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
          <a
          href="/login?next=/support?cs_web_redirect=/buyer" // eslint-disable-line
          >
            <div className="personalized-login-btn" data-cy="page-button">
              <div className="personalized-btn-text">
                <span>Log in</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHelp;

PersonalizedHelp.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
