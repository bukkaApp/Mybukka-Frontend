import 'babel-polyfill'; // eslint-disable-line

import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

// import AuthModal from 'Components/navbar/common/AuthModal';
import reduxStore from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar from
  '../components/progress-bar/IndeterminateProgressbar';
import AlertMessage from '../components/alert';

import './index.scss';
import './animate.scss';

toast.configure();

const { store, persistor } = reduxStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IndeterminateProgressbar />
      <AlertMessage />
      {/* <AuthModal push={() => {}} /> */}
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
