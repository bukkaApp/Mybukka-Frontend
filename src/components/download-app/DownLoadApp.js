import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import bukkLogo from '../../assets/bukka_logo.png';

import './DownLoadApp.scss';
import { useNotificationContext } from '../../context/NotificationContext';
import { useToastContext } from '../../context/ToastContext';

const DownLoadApp = () => {
  const totalDownload = 0;
  const { setToast } = useToastContext();
  const { setAppInstalled, setDownloadApp, deferredAppDownloadPrompt, downloadApp, setDeferredDownloadAppPrompt } = useNotificationContext();
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const handleAppInstallation = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredDownloadAppPrompt(e);
      // Update UI notify the user they can install the PWA
      setDownloadApp(true);
    };
    const appInstalled = () => {
      // Hide the app provided install promotion
      setDownloadApp(false);
      // TODO: show app banner component and remove toast
      setToast({ message: 'App installed', type: 'success' });
      setAppInstalled(true);
    };

    window.addEventListener('appinstalled', appInstalled);
    window.addEventListener('beforeinstallprompt', handleAppInstallation);
    return () => {
      window.removeEventListener('appinstalled', appInstalled);
      window.removeEventListener('beforeinstallprompt', handleAppInstallation);
    };
  }, []);

  // Trusted Promotion number of download and link to playstore
  const onClickToInstallApp = (e) => {
    if (!deferredAppDownloadPrompt) return;
    console.log(e);
    // Hide the app provided install promotion
    setDownloadApp(false);
    // Show the install prompt => 'Install Bukka Mobile Application'
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
    (isMobileScreen && downloadApp) &&
    <div className="DownLoadApp Smart-Banner">
      <div aria-pressed="false" tabIndex="0" role="button" onClick={() => setDownloadApp(false)} className="Smart-Banner-Close-Wrapper">
        <div className="Smart-Banner-Close-Accessibility-Overlay" data-af-close-button="" />
        <svg className="Smart-Banner-Close-Button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" version="1.1" width="7" height="7">
          <path d="M0 0 L1 1 M1 0 L0 1" strokeWidth="0.1" />
        </svg>
      </div>
      <div className="Smart-Banner-Icon-Wrapper">
        <img className="Smart-Banner-Img" src={bukkLogo} alt="Download the app" />
      </div>
      <div className="Smart-Banner-Content-Wrapper">
        <div className="Smart-Banner-Content-Title">Download the app</div>
        <div className="Smart-Banner-Content-Description" />
        <div className="Smart-Banner-Content-Ratings">
          <div className="Smart-Banner-Ratings--container">
            <svg version="1.1" id="Smart-Banner-Rating-stars-svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8000 1417.32" style={{ enableBackground: 'new 0 0 1417.32 1417.32' }} xmlSpace="preserve" height="12">
              <g transform="translate(0, 0)">
                <path id="p1Full" className="st full-star" d="M51.44,637.77l249.51,213.39c25.07,21.45,36.01,55.11,28.36,87.2l-76.34,319.21c-18.18,76.07,64.64,136.18,131.39,95.39l280.18-171.18c28.17-17.2,63.57-17.2,91.74,0l280.18,171.18c66.76,40.8,149.57-19.35,131.4-95.39l-76.37-319.21c-7.67-32.09,3.27-65.75,28.36-87.2l249.51-213.39c59.44-50.84,27.81-148.13-50.18-154.36l-327.37-26.07c-32.9-2.61-61.56-23.43-74.22-53.89L791.61,100.38c-30.02-72.23-132.37-72.23-162.42,0L503.21,403.45c-12.66,30.45-41.31,51.27-74.22,53.89l-327.37,26.07C23.62,489.64-8.03,586.94,51.44,637.77z" />
                <path id="p1Half" className="st full-star" d="M710.66,46.24c-32.94,0-65.88,13.68-80.84,50L504.42,401.2c-12.61,30.65-31.77,57.23-64.51,59.88l-331.22,18.06C31.04,485.38-7.96,582.33,51.2,633.48L303.07,851.7c24.97,21.58,35.85,55.45,28.21,87.73l-76.31,318.13c-18.12,76.52,59.09,145.71,125.53,104.66l284.48-177.9c14.01-8.64,29.86-19.93,45.69-19.93" />
              </g>
              <g transform="translate(1600, 0)">
                <path id="p2Full" className="st full-star" d="M51.44,637.77l249.51,213.39c25.07,21.45,36.01,55.11,28.36,87.2l-76.34,319.21c-18.18,76.07,64.64,136.18,131.39,95.39l280.18-171.18c28.17-17.2,63.57-17.2,91.74,0l280.18,171.18c66.76,40.8,149.57-19.35,131.4-95.39l-76.37-319.21c-7.67-32.09,3.27-65.75,28.36-87.2l249.51-213.39c59.44-50.84,27.81-148.13-50.18-154.36l-327.37-26.07c-32.9-2.61-61.56-23.43-74.22-53.89L791.61,100.38c-30.02-72.23-132.37-72.23-162.42,0L503.21,403.45c-12.66,30.45-41.31,51.27-74.22,53.89l-327.37,26.07C23.62,489.64-8.03,586.94,51.44,637.77z" />
                <path id="p2Half" className="st full-star" d="M710.66,46.24c-32.94,0-65.88,13.68-80.84,50L504.42,401.2c-12.61,30.65-31.77,57.23-64.51,59.88l-331.22,18.06C31.04,485.38-7.96,582.33,51.2,633.48L303.07,851.7c24.97,21.58,35.85,55.45,28.21,87.73l-76.31,318.13c-18.12,76.52,59.09,145.71,125.53,104.66l284.48-177.9c14.01-8.64,29.86-19.93,45.69-19.93" />
              </g>
              <g transform="translate(3200, 0)">
                <path id="p3Full" className="st full-star" d="M51.44,637.77l249.51,213.39c25.07,21.45,36.01,55.11,28.36,87.2l-76.34,319.21c-18.18,76.07,64.64,136.18,131.39,95.39l280.18-171.18c28.17-17.2,63.57-17.2,91.74,0l280.18,171.18c66.76,40.8,149.57-19.35,131.4-95.39l-76.37-319.21c-7.67-32.09,3.27-65.75,28.36-87.2l249.51-213.39c59.44-50.84,27.81-148.13-50.18-154.36l-327.37-26.07c-32.9-2.61-61.56-23.43-74.22-53.89L791.61,100.38c-30.02-72.23-132.37-72.23-162.42,0L503.21,403.45c-12.66,30.45-41.31,51.27-74.22,53.89l-327.37,26.07C23.62,489.64-8.03,586.94,51.44,637.77z" />
                <path id="p3Half" className="st full-star" d="M710.66,46.24c-32.94,0-65.88,13.68-80.84,50L504.42,401.2c-12.61,30.65-31.77,57.23-64.51,59.88l-331.22,18.06C31.04,485.38-7.96,582.33,51.2,633.48L303.07,851.7c24.97,21.58,35.85,55.45,28.21,87.73l-76.31,318.13c-18.12,76.52,59.09,145.71,125.53,104.66l284.48-177.9c14.01-8.64,29.86-19.93,45.69-19.93" />
              </g>
              <g transform="translate(4800, 0)">
                <path id="p4Full" className="st full-star" d="M51.44,637.77l249.51,213.39c25.07,21.45,36.01,55.11,28.36,87.2l-76.34,319.21c-18.18,76.07,64.64,136.18,131.39,95.39l280.18-171.18c28.17-17.2,63.57-17.2,91.74,0l280.18,171.18c66.76,40.8,149.57-19.35,131.4-95.39l-76.37-319.21c-7.67-32.09,3.27-65.75,28.36-87.2l249.51-213.39c59.44-50.84,27.81-148.13-50.18-154.36l-327.37-26.07c-32.9-2.61-61.56-23.43-74.22-53.89L791.61,100.38c-30.02-72.23-132.37-72.23-162.42,0L503.21,403.45c-12.66,30.45-41.31,51.27-74.22,53.89l-327.37,26.07C23.62,489.64-8.03,586.94,51.44,637.77z" />
                <path id="p4Half" className="st full-star" d="M710.66,46.24c-32.94,0-65.88,13.68-80.84,50L504.42,401.2c-12.61,30.65-31.77,57.23-64.51,59.88l-331.22,18.06C31.04,485.38-7.96,582.33,51.2,633.48L303.07,851.7c24.97,21.58,35.85,55.45,28.21,87.73l-76.31,318.13c-18.12,76.52,59.09,145.71,125.53,104.66l284.48-177.9c14.01-8.64,29.86-19.93,45.69-19.93" />
              </g>
              <g transform="translate(6400, 0)">
                <path id="p5Full" className="st full-star" d="M51.44,637.77l249.51,213.39c25.07,21.45,36.01,55.11,28.36,87.2l-76.34,319.21c-18.18,76.07,64.64,136.18,131.39,95.39l280.18-171.18c28.17-17.2,63.57-17.2,91.74,0l280.18,171.18c66.76,40.8,149.57-19.35,131.4-95.39l-76.37-319.21c-7.67-32.09,3.27-65.75,28.36-87.2l249.51-213.39c59.44-50.84,27.81-148.13-50.18-154.36l-327.37-26.07c-32.9-2.61-61.56-23.43-74.22-53.89L791.61,100.38c-30.02-72.23-132.37-72.23-162.42,0L503.21,403.45c-12.66,30.45-41.31,51.27-74.22,53.89l-327.37,26.07C23.62,489.64-8.03,586.94,51.44,637.77z" />
                <path id="p5Half" className="st full-star" d="M710.66,46.24c-32.94,0-65.88,13.68-80.84,50L504.42,401.2c-12.61,30.65-31.77,57.23-64.51,59.88l-331.22,18.06C31.04,485.38-7.96,582.33,51.2,633.48L303.07,851.7c24.97,21.58,35.85,55.45,28.21,87.73l-76.31,318.13c-18.12,76.52,59.09,145.71,125.53,104.66l284.48-177.9c14.01-8.64,29.86-19.93,45.69-19.93" />
              </g>
            </svg>
          </div>
          <span className="Smart-Banner-Content-Ratings--count">{totalDownload}{`${totalDownload >= 1000000 ? 'm' : 'k'}`}</span>
        </div>
      </div>
      <div className="Smart-Banner-Button-Container">
        <button onClick={onClickToInstallApp} className="Smart-Banner-Download-Button" data-af-cta-button="" data-af-cta-url="https://postmates.onelink.me/5uYG?creative_id=bdd3b427-5f31-47fe-83dc-96ea21a86161&amp;af_banner=true&amp;af_channel=af_web_banner&amp;pid=af_banner&amp;c=smartbanner_aff_aff_smartbanner_all_all_fee_all_all&amp;af_dp=postmates://&amp;is_retargeting=true&amp;af_banner_sdk_ver=1&amp;">Install</button>
      </div>
    </div>
  );
};

export default DownLoadApp;
