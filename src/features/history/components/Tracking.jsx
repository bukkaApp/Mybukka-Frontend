import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';
import TrackingHeader from './TrackingHeader';
import Timeline from '../common/Timeline';
import trackingDisplayClose from '../actionCreators/trackingDisplayClose';

import './tracking.scss';

const Tracking = ({ show, status, closeTrackingDropdown }) => {
  const colorObj = {
    [status]: 'timeline-active',
  };

  const trackingStatus = {
    delivered: {
      text: 'order dispatched',
      icon: '',
      time: '5/3/16 10:55 AM',
      status: colorObj.delivered || ''
    },
    recieved: {
      text: 'Order received by the dispatch',
      icon: '.',
      time: '5/3/16 10:55 AM',
      status: colorObj.recieved || ''
    },
    pending: {
      text: 'waiting for pick up',
      icon: '',
      time: '5/3/16 10:55 AM',
      status: colorObj.pending || ''
    },
    accepted: {
      text: 'Accepted by chef',
      icon: '.',
      time: '5/3/16 10:55 AM',
      status: colorObj.accepted || ''
    },
    rejected: {
      text: 'Your order was rejected by chef',
      icon: '.',
      time: '5/3/16 10:55 AM',
      status: colorObj.rejected || ''
    },
    cancelled: {
      text: 'You cancelled this order',
      icon: '.',
      time: '5/3/16 10:55 AM',
      status: colorObj.cancelled || ''
    },
  };

  return (
    <Fragment>
      <div
        className={`tracking-absolute ${show ? 'tracking' : 'not-tracking'}`}
      >
        <div className="bg-color">
          <div className={'tracking-content content-bg-color'}>
            <TrackingHeader open={show} handleClick={closeTrackingDropdown} />
            <div className="tracking-content-body">
              {
                Object.keys(trackingStatus).map(dom => (
                  <Timeline
                    key={shortId.generate()}
                    icon={trackingStatus[dom].icon}
                    time={trackingStatus[dom].time}
                    status={trackingStatus[dom].text}
                    classNames={trackingStatus[dom].status}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`${show ? 'tracking-backdrop' : ''}`} />
    </Fragment>
  );
};

const mapStateToProps = ({
  displayTrackingReducer: { show, status },
}) => ({
  show,
  status,
});

export default connect(
  mapStateToProps,
  { closeTrackingDropdown: trackingDisplayClose,
  }
)(Tracking);

Tracking.propTypes = {
  closeTrackingDropdown: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};
