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
import Primary from '../provider/Primary';

const { store, persistor } = reduxStore();

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndeterminateProgressbar />
          <AlertMessage />
          <Primary>
            <Main />
          </Primary>
        </PersistGate>
      </Provider>
    </Suspense>
  </BrowserRouter>
);

export default App;
