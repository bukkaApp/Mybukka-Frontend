import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';

import navbarAuthReducer from 'Components/navbar/reducers/navbarAuthReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import checkoutModeReducer from
  'Components/common-navs/reducers/checkoutModeReducer';

import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

import deliveryModeReducer from '../components/common-navs/reducers/deliveryModeReducer';
import selectedLocationReducer from './selectedLocationReducer';

import locationsPredictionReducer from '../features/home/reducers/locationsPredictionReducer';

import bukkasReducer from '../features/feed/reducers/bukkasReducer';

import fetchUserAddress from '../features/profile/reducers/fetchUserAddress';
import fetchUserData from '../features/profile/reducers/fetchUserData';
import postUserAddress from '../features/profile/reducers/postUserAddress';
import postUserData from '../features/profile/reducers/postUserData';
import displayTrackingReducer from '../features/history/reducers/displayTrackingReducer';
import getOrderHistoryReducer from '../features/history/reducers/getOrderHistoryReducer';
import validateTokenReducer from '../features/forgotPassword/reducers/validateTokenReducer';
import requestPasswordChangesReducer from '../features/forgotPassword/reducers/requestPasswordChangesReducer';
import changePasswordReducer from '../features/forgotPassword/reducers/changePasswordReducer';
import fetchBukkaReducer from '../features/bukka/reducers/fetchBukkaReducer';

import fetchBukkaMenuReducer from '../features/bukka/reducers/fetchBukkaMenuReducer';

import manipulateCardDetailsReducer from '../features/checkout/reducers/manipulateCardDetailsReducer';

import chargeUserReducer from '../features/checkout/reducers/chargeUserReducer';

import finishTransactionReducer from '../features/checkout/reducers/finishTransactionReducer';
import signOutReducer from '../components/navbar/reducers/signOutReducer';
import searchAnythingReducer from './searchAnythingReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  signOutReducer,
  navbarAuthReducer,
  deliveryModeReducer,
  locationsPredictionReducer,
  selectedLocationReducer,
  bukkasReducer,
  fetchUserAddress,
  fetchUserData,
  postUserAddress,
  postUserData,
  displayTrackingReducer,
  getOrderHistoryReducer,
  validateTokenReducer,
  requestPasswordChangesReducer,
  changePasswordReducer,
  fetchBukkaMenuReducer,
  fetchBukkaReducer,
  manipulateCardDetailsReducer,
  chargeUserReducer,
  finishTransactionReducer,
  checkoutModeReducer,
  searchAnythingReducer,
});

let middleware = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'authenticationReducer',
    'fetchBukkaReducer',
    'fetchBukkaMenuReducer'
  ]
};
const persistedReducer = persistReducer(persistConfig, reducer);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
};
