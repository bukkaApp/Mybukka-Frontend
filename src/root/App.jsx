import 'babel-polyfill'; // eslint-disable-line

import React, { Suspense, Fragment } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar, { ProgressSwitch, ProgressBar } from
  '../components/progress-bar/IndeterminateProgressbar';
import AlertMessage from '../components/alert';
// import Loader from '../components/loader/Loader';

import ModalRoot from '../components/modal-root';
import AuthModal from '../features/modal-root/Index';
import './index.scss';
import './animate.scss';
import Primary from '../provider/Primary';
import useAutocompleteService from '../hooks/useAutocompleteService';
import Cookie from '../components/cookie';

const { store, persistor } = reduxStore();

const App = () => {
  const { LoadService } = useAutocompleteService();
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<ProgressBar loading />}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <IndeterminateProgressbar />
              <AlertMessage />
              <Primary>
                <ProgressSwitch />
                <LoadService />
                <Main />
                <ModalRoot />
                <AuthModal /> {/* would be change to be in Modal root */}
                <Cookie />
              </Primary>
            </PersistGate>
          </Provider>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
