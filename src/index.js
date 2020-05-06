import React, { StrictMode } from 'react';
// import { render } from 'react-dom';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { createRoot } from 'react-dom';
import App from './root/App';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
