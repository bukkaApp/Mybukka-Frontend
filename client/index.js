import React, { StrictMode } from 'react';
// import { render } from 'react-dom';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { createRoot } from 'react-dom';
import App from '../src/root/App';
// import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
/* eslint-disable no-unused-vars */

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
