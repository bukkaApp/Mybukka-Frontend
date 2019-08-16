import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'Components/navbar';
import Container from 'Components/container';
import ResetIntroSection from './ResetIntroSection';
import FeedbackSection from './FeedbackSection';
import requestPassChanges from '../actionCreators/requestPassChanges';
import ModalRoot from '../../modal-root/Index';

import './resetsection.scss';

const ResetSection = ({
  history: { push },
  sendARequestToChangePassword,
  requested,
  errorMessage
}) => (
  <>
    <ModalRoot push={push} />
    <Navbar push={push} />
    <div className="bg-color py-8">
      <Container classNames="relative modal-open">
        <div
          className="d-flex flex-column flex-xl-row
          flex-lg-row flex-md-column justify-content-center"
        >
          <div
            className={`col-xl-6 col-lg-6 px-0 px-md-0 px-lg-3
              col-md-12 col-12 ${requested ? 'd-none' : ''}`}
          >
            <div className="card-shadow card mb-3 border">
              <ResetIntroSection
                push={push}
                sendARequestToChangePassword={sendARequestToChangePassword}
                errorMessage={errorMessage}
              />
            </div>
          </div>
          <div className={`col-xl-6 col-lg-6 px-0 px-md-0
            px-lg-3 col-md-12 col-12 ${requested ? '' : 'd-none'}`}
          >
            <div className="card-shadow card mb-3 border">
              <FeedbackSection push={push} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  </>
);

const mapStateToProps = ({
  requestPasswordChangesReducer: { requested, errorMessage }
}) => ({
  requested,
  errorMessage
});

export default connect(mapStateToProps, {
  sendARequestToChangePassword: requestPassChanges
})(ResetSection);

ResetSection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  requested: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  sendARequestToChangePassword: PropTypes.func.isRequired,
};
