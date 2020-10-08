import React from 'react';
import './fresh.scss';
import Orange from '../img/orange.svg';
import Button from 'Components/button/Button';
import { useEventContext } from '../../../context/EventContext';


const Fresh = () => {
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
        <div className="groc">
            <div>
                <img src={Orange} alt="" className="eries" />
            </div>
            <div className="groc-right">
                <h5>We deliver more than <br /> food.</h5>
                <p>Get groceries fresh fruit and drinks
                delivered in under an hour so you can
                spend your time living your best life.
            Whether you need a gallon of milk or a handle of vodka, we get it.</p>
                <NewClick handleClick={onClickToInstallApp} />
            </div>
        </div>
    );
};

const NewClick = ({ handleClick }) => (
    <div className="new-click">
      <Button
        type="button"
        classNames="primary-button"
        handleClick={handleClick}
        text="get started"
      />
    </div>
  );

export default Fresh;

