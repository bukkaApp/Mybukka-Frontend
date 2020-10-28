import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/button/Button';

import './discoversection.scss';
import Img from '../../../components/img/Img';
import { useEventContext } from '../../../context/EventContext';

const LargeText = () => (
  <div className="large-text-discover">
    <h2 className="large-text">Discover, order, and track right here.</h2>
  </div>
);

const SmallText = () => (
  <div className="small-text-discover">
    <h5 className="smaller-text ">
      With the largest on-demand network in the industry, you can explore your
      city, find its hidden hotspots, and watch as we bring your new favorites
      right to your door. Download the app for iOS or Android for free.
    </h5>
  </div>
);

export const ActionButton = ({ handleClick }) => (
  <div className="action-button-section">
    <Button
      type="button"
      classNames="primary-button"
      handleClick={handleClick}
      text="get started"
    />
  </div>
);

const SideImage = () => (
  // <div className="side-image-section">
  <Img
    options={{ w: 500 }}
      src="https://res.cloudinary.com/dn93xk5ni/image/upload/v1548762594/app-car-charging-33488_fnegrl.jpg" // eslint-disable-line
    alt="discovery"
    className="side-image"
  />
  // </div>
);

const DiscoverSection = () => {
  const { setDownloadApp, deferredAppDownloadPrompt, appInstalled } = useEventContext();

  const onClickToInstallApp = (e) => {
    if (!deferredAppDownloadPrompt) return;
    console.log(e);
    // Hide the app provided install promotion
    setDownloadApp(false);
    // Show the install prompt
    deferredAppDownloadPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredAppDownloadPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setDownloadApp(false);
        console.log('User accepted the install prompt');
      } else {
        setDownloadApp(false);
        console.log('User dismissed the install prompt');
      }
    });
  };

  return (
    !appInstalled &&
    <div className="container discover-section">
      <div className="row align-items-center">
        <div className="discover-section-text col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <LargeText />
          <div className="d-none d-md-block">
            <SmallText />
            <ActionButton handleClick={onClickToInstallApp} />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <SideImage />
          <div className="d-md-none">
            <SmallText />
            <ActionButton handleClick={onClickToInstallApp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;

ActionButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};
