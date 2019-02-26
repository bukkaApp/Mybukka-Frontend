import 'babel-polyfill'; // eslint-disable-line

import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../redux/store';
import Main from './Main';
import IndeterminateProgressbar from '../components/progress-bar/IndeterminateProgressbar';

const App = () => (
  <Provider store={store}>
    <IndeterminateProgressbar />
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
);

export default App;
