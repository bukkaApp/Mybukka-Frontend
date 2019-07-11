import 'babel-polyfill'; // eslint-disable-line

import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar from '../components/progress-bar/IndeterminateProgressbar';

import './animate.scss';

toast.configure();

const { store, persistor } = reduxStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IndeterminateProgressbar />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
