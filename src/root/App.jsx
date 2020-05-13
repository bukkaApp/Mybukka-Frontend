import 'babel-polyfill'; // eslint-disable-line

import React, { Suspense, Fragment } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar, { ProgressBar } from
  '../components/progress-bar/IndeterminateProgressbar';
import AlertMessage from '../components/alert';
// import Loader from '../components/loader/Loader';

import './index.scss';
import './animate.scss';
import Primary from '../provider/Primary';
import useAutocompleteService from '../context/useAutocompleteService';

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
                <Main />
              </Primary>
            </PersistGate>
          </Provider>
        </Suspense>
      </BrowserRouter>
      <LoadService />
    </Fragment>
  );
};
export default App;
