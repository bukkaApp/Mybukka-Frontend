import 'babel-polyfill'; // eslint-disable-line

import React, { Suspense } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar from
  '../components/progress-bar/IndeterminateProgressbar';
import AlertMessage from '../components/alert';
import Loader from '../components/loader/Loader';

import './index.scss';
import './animate.scss';
import ContextProviders from './ContextProviders';

const { store, persistor } = reduxStore();

const App = () => (
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndeterminateProgressbar />
          <AlertMessage />
          <ContextProviders>
            <Main />
          </ContextProviders>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>
);

export default App;
