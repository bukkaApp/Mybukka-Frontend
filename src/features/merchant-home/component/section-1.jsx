import React from 'react';

import PrimaryNavbar from 'Components/navbar';

import Button from 'Components/button/Button';
import { useEventContext } from '../../../context/EventContext';


const BigText = () => (
    <div className="container large-text-section">
    <h2 className="text-center larger-text">
      Grow Your Take Out Sales By 200%.
    </h2>
  </div>
);

const TinyText = () => (
    <div className="container small-text-section">
    <h5 className="text-center text-white sub-text">
       With the top 3rd-party delivery platform for customer spend and retention.
    </h5>
  </div>
);


const Swift = ({ handleClick }) => (
    <Button
      type="button"
      classNames="primary-button"
      handleClick={handleClick}
      text="get started"
    />

);

const SectionOne = ({ push }) =>  {
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
      <div className="intro-section">
        <PrimaryNavbar push={push} authButton />
        <BigText />
        <TinyText />
      <div className="text-center">
        <Swift handleClick={onClickToInstallApp} />
        </div>
      </div>
  );
};

  export default SectionOne;
  
  
  