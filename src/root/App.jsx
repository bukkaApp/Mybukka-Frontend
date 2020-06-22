import React, { Suspense } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from '../redux/store';
import Main from './Main';

import IndeterminateProgressbar, {
  ProgressSwitch,
  ProgressBar,
  IndeterminateProgressBarState
} from '../components/progress-bar/IndeterminateProgressbar';

import Toast from '../components/Toast/Toast';
import ModalRoot from '../components/modal-root';
import './index.scss';
import './animate.scss';
import Primary from '../provider/Primary';
import Secondary from '../provider/Secondary';
import useAutocompleteService from '../hooks/useAutocompleteService';
import Cookie from '../components/cookie';
import DownLoadApp from '../components/download-app/DownLoadApp';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';

const { store, persistor } = reduxStore();

const App = () => {
  const { LoadService } = useAutocompleteService();
  return (
    <BrowserRouter>
      <ErrorBoundary minimal>
        <Suspense fallback={<ProgressBar loading />}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <IndeterminateProgressbar />
              <Secondary>
                <Primary>
                  <ErrorBoundary>
                    <IndeterminateProgressBarState />
                    <ProgressSwitch />
                    <DownLoadApp />
                    <Toast />
                    <LoadService />
                    <Main />
                    <ModalRoot />
                    <Cookie />
                  </ErrorBoundary>
                </Primary>
              </Secondary>
            </PersistGate>
          </Provider>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
export default App;
