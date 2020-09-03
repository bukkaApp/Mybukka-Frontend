import React from 'react';

import PropTypes from 'prop-types';

import EmailSent from 'Components/icons/EmailSent';
import Container from 'Components/container';
import GoToLogin from '../common/GoToLogin';

import './feedbacksection.scss';

const Feedback = ({ push }) => (
  <>
    <Container classNames="pt-5 pb-2 px-4">
      <div className="col-3 mx-auto">
        <EmailSent />
      </div>
      <div className="py-2">
        <h3 className="ft-18">
          Instructions on resetting your password are on their way!
        </h3>
        <br />
        <h3 className="ft-15">
          If you {"don't"} receive an email soon ensure that the email is valid
          <i className="text-muted"> (retrieve your email(s))</i> and that you
          can receive emails from support@mybukka.com.
        </h3>
        <h3 className="ft-15">
          Contact support@mybukka.com for additional assistance.
        </h3>
      </div>
    </Container>
    <div className="pb-4">
      <GoToLogin push={push} />
    </div>
  </>
);

export default Feedback;

Feedback.defaultProps = {
  push: () => {}
};

Feedback.propTypes = {
  push: PropTypes.func
};
