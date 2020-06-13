import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { matchPath, useLocation } from 'react-router-dom';
import Times from 'Components/icons/Times';
import Clock from 'Icons/Clock';
import Menu from 'Icons/Menu';
import Modal from '../modal/Modal';
import timeService from '../../utils/timeService';
import { useBusinessContext } from '../../context/BusinessContext';
import { useModalContext } from '../../context/ModalContext';
import { schedule as altSchedule } from '../../shared/schedule';
import SingleImage from '../img/SingleImage';

import './BusinessClosedPopup.scss';

// NOTE: notfication image width to be converted to 80

const Head = ({ imageUrl }) => (
  <div className="closed-notification-heading">
    <SingleImage options={{ w: 80 }} className="Business-Closed-Img" src={imageUrl} alt="profileImage" />
  </div>
);

const Body = ({ name }) => (
  <div className="Closed-notification-body">
    <p className="closed-notification-body-heading">
      <span>{name}</span>  is closed.
    </p>
    <p className="closed-notification-body-content">
      <span>
        You can still get notified,
        schedule for later or choose a similar merchant.
      </span>
    </p>
  </div>
);

const Footer = ({ onHide }) => (
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
    <li
      onClick={onHide}
      tabIndex="0"
      aria-pressed="false"
      role="button"// eslint-disable-line
      onKeyDown={() => {}}
      className="closed-notification-footer-item"
    >
      <span className="closed-notification-footer-img note-menu">
        <Menu color="#fff" />
      </span>
      <span className="closed-notification-footer-text">
        <span>View menu</span>
      </span>
    </li>
  </ul>
);

const ClosedModal = ({ onHide }) => (
  <span
    onClick={onHide}
    tabIndex="0"
    aria-pressed="false"
    role="button"
    className="dismiss-closed-notification-icon"
  >
    <Times />
  </span>
);

// const hasSchedule = schedule && schedule.length > 0 ? schedule : altSchedule;

const BusinessClosedPopup = () => {
  const { setModal, setBusinessClosedPopup, businessClosedPopup } = useModalContext(false);
  const { business } = useBusinessContext(false);
  const { pathname } = useLocation();

  const matchBusinessScreen = matchPath(pathname, {
    path: '/bukka/:slug',
    exact: true,
    strict: false
  });

  const src = (business && (business.headerImg || business.imageUrl)) || '';

  const onClick = (state) => {
    setModal(state);
    setBusinessClosedPopup(state);
  };

  useEffect(() => {
    let dailySchedule;

    if (business && business.schedule.length) {
      const { schedule } = business;
      dailySchedule = schedule[timeService.getDay()];
    } else {
      dailySchedule = altSchedule[timeService.getDay()];
    }

    const time = timeService.convert(timeService.getTime(12));
    const closeTime = timeService.convert(dailySchedule.closingHour);

    const hasClosed = time >= closeTime;
    if (matchBusinessScreen && business && hasClosed) onClick(true);
  }, [business]);


  return (
    <Modal onClickOut={() => onClick(false)} show={businessClosedPopup}>
      <div className="closed-notification">
        <ClosedModal onHide={() => onClick(false)} />
        <Head imageUrl={src} />
        <Body name={business && business.name} />
        <Footer onHide={() => onClick(false)} />
      </div>
    </Modal>
  );
};

export default BusinessClosedPopup;

Body.defaultProps = {
  name: 'Blue Barn Gourmet'
};

Body.propTypes = {
  name: PropTypes.string
};

Footer.propTypes = {
  onHide: PropTypes.func.isRequired
};

Head.propTypes = {
  imageUrl: PropTypes.string.isRequired
};

ClosedModal.propTypes = {
  onHide: PropTypes.func.isRequired,
};
