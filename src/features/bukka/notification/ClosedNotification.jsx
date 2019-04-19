import React from 'react';

import Times from 'Components/icons/Times';
import Clock from 'Components/icons/Clock';
import Magnifier from '../../../components/icons/Magnifier';

import './closednotification.scss';

// NOTE: notfication image width to be converted to 80

const Head = () => (
  <div className="closed-notification-heading">
    <div>
      <img
        alt=""
        src="https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com%2Fa8912000-cce8-487b-825c-1fcec5067e49%2Forig.png&amp;quality=85&amp;w=80&amp;h=80&amp;mode=auto&amp;format=webp&amp;v=4"
        className="closed-notification-image"
      />
      <div
        title=""
        className="closed-notification-bg-image"
        style={{
          backgroundImage:
                'url(&quot;https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com%2Fa8912000-cce8-487b-825c-1fcec5067e49%2Forig.png&amp;quality=85&amp;w=80&amp;h=80&amp;mode=auto&amp;format=webp&amp;v=4&quot;)',
          opacity: 1
        }}
      />
    </div>
  </div>
);

const Body = () => (
  <div className="closed-notfication-body">
    <p className="closed-notification-body-heading">
      <span>Blue Barn Gourmet is closed.</span>
    </p>
    <p className="closed-notification-body-content">
      <span>
        You can still get notified,
        schedule for later or choose a similar merchant.
      </span>
    </p>
  </div>
);

const Footer = () => (
  <ul className="closed-notification-footer">
    <li className="closed-notification-footer-item">
      <span className="closed-notification-footer-img note-bell" />
      <span className="closed-notification-footer-text">
        <span>Get notified</span>
      </span>
    </li>
    <li className="closed-notification-footer-item">
      <span className="closed-notification-footer-img note-time">
        <Clock />
      </span>
      <span className="closed-notification-footer-text">
        <span>Schedule later</span>
      </span>
    </li>
    <li className="closed-notification-footer-item">
      <span className="closed-notification-footer-img note-menu">
        <Magnifier />
      </span>
      <span className="closed-notification-footer-text">
        <span>View menu</span>
      </span>
    </li>
  </ul>
);

const ClosedNotification = () => (
  <div className="modal-root">
    <div>
      <div className="closed-notification-container">
        <div className="closed-notification">
          <span className="dismiss-closed-notification-icon">
            <Times />
          </span>
          <Head />
          <Body />
          <Footer />
        </div>
      </div>
    </div>
  </div>
);

export default ClosedNotification;

ClosedNotification.propTypes = {
  // mode: PropTypes.string.isRequired,
};
