import React from 'react';

import PropTypes from 'prop-types';
import Navlink from 'Components/navlink/Navlink';
import Telescope from 'Components/icons/Telescope';
import Container from 'Components/container';
import GoToLogin from '../common/GoToLogin';

import './feedbacksection.scss';

const TokenErrorFeedback = ({ push }) => (
  <>
    <Container classNames="pt-5 pb-2 px-4">
      <div className="col-3 text-center mx-auto">
        <Telescope />
      </div>
      <div className="py-2">
        <h3 className="ft-18">Page Not Found</h3>
        <br />
        <h3 className="ft-15">
          We {"can't"} find the page {"you're"} looking for
          <i className="text-muted"> :( </i>
          <br /> Please check for
          <i className="text-muted"> errors in the URL</i> {"you're"} trying to use or
          <Navlink classNames="text-muted" href="/"> start over</Navlink>.
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

export default TokenErrorFeedback;

TokenErrorFeedback.defaultProps = {
  push: () => { },
};

TokenErrorFeedback.propTypes = {
  push: PropTypes.func,
};
