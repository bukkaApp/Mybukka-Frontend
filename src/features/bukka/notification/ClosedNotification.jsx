import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import authServices from 'Utilities/authServices';
import generateImageUrl from 'Utilities/generateScreenSizeImageUrl';

import Times from 'Components/icons/Times';
import Clock from 'Icons/Clock';
import Menu from 'Icons/Menu';

import './closednotification.scss';

// NOTE: notfication image width to be converted to 80

const Head = ({ imageUrl }) => (
  <div className="closed-notification-heading">
    <div>
      <img
        alt=""
        src={imageUrl}
        className="closed-notification-image"
      />
      <div
        title=""
        className="closed-notification-bg-image"
        style={{
          backgroundImage: `url(&quot;${imageUrl}&quot;)`,
          opacity: 1
        }}
      />
    </div>
  </div>
);

const Body = ({ name }) => (
  <div className="closed-notfication-body">
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

const ClosedNotification = ({ fetchedBukka }) => {
  const [isOpen, setState] = useState(false);
  const { closingHour, openingHour, imageUrl } = fetchedBukka;
  const { getRestaurantWrkHour, getCurrentHour } = authServices;
  let isRestaurantClosed, isRestaurantOpened;

  const newImage = imageUrl ? generateImageUrl(imageUrl, 80) : '';

  if (closingHour && openingHour) {
    isRestaurantClosed = getRestaurantWrkHour('2 pm') <= getCurrentHour();
    isRestaurantOpened = getRestaurantWrkHour(openingHour) <= getCurrentHour();
  }

  const setBodyOverflow = () => {
    document.body.style.overflow = 'hidden';
  };

  const removeBodyOverflow = () => {
    document.body.style.overflow = ''; // eslint-disable-line
  };

  const removeBodyDefaultHiddenOverFlow = () => {
    if (document.body.style.overflow !== ''
    && (isRestaurantOpened && !isRestaurantClosed)) {
      removeBodyOverflow();
    }
  };

  const toggleModal = () => {
    if (!isOpen) { // i.e about to open modal add overflow:hidden
      setBodyOverflow();
    } else { removeBodyOverflow(); }
    setState(!isOpen);
  };

  const handleRestaurantUnavalaibleModal = () => {
    if (!isRestaurantOpened || isRestaurantClosed) {
      toggleModal();
    }
  };

  useEffect(() => {
    handleRestaurantUnavalaibleModal();
  }, []);

  removeBodyDefaultHiddenOverFlow();

  if (Object.keys(fetchedBukka).length <= 0) {
    return null;
  }

  if (isRestaurantOpened && !isRestaurantClosed) {
    return null;
  }

  return (
    isOpen &&
    <div className="modal-root">
      <div>
        <div className="closed-notification-container">
          <div className="closed-notification">
            <ClosedModal onHide={toggleModal} />
            <Head imageUrl={newImage} />
            <Body name={fetchedBukka.name} />
            <Footer onHide={toggleModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ fetchBukkaReducer: { fetchedBukka } }) => ({
  fetchedBukka
});

export default connect(mapStateToProps)(ClosedNotification);

ClosedNotification.defaultProps = {
  fetchedBukka: {}
};

ClosedNotification.propTypes = {
  fetchedBukka: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool,
    ])),
};

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
