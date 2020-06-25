import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom';
import { TrackJS } from 'trackjs';
import App from '../src/root/App';
import Worker from './Worker';
import './index.scss';

let trackConfig = {
  network: { error: false },
};

// ...
__webpack_nonce__ = 'c29tZSBjb29sIHN0cmluZyB3aWxsIHBvcCB1cCAxMjM='; // eslint-disable-line
// ...

if (process.env.NODE_ENV === 'production') {
  trackConfig = {
    ...trackConfig,
    application: 'bukka-prod',
    token: '7ceaed085f00408e802377191873a77b',
  };
}

TrackJS.install(trackConfig);

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <Worker>
      <App />
    </Worker>
  </StrictMode>
);

