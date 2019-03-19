import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';

import homeReducer from 'Components/navbar/reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

import deliveryModeReducer from
  '../components/common-navs/reducers/deliveryModeReducer';
import selectedLocationReducer from './selectedLocationReducer';

import locationsPredictionReducer from
  '../features/home/reducers/locationsPredictionReducer';

import bukkasReducer from '../features/feed/reducers/bukkasReducer';

import fetchUserAddress from '../features/profile/reducers/fetchUserAddress';
import fetchUserData from '../features/profile/reducers/fetchUserData';
import postUserAddress from '../features/profile/reducers/postUserAddress';
import postUserData from '../features/profile/reducers/postUserData';
import validateTokenReducer from '../features/forgotPassword/reducers/validateTokenReducer';
import requestPasswordChangesReducer from '../features/forgotPassword/reducers/requestPasswordChangesReducer';
import changePasswordReducer from '../features/forgotPassword/reducers/changePasswordReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  homeReducer,
  deliveryModeReducer,
  locationsPredictionReducer,
  selectedLocationReducer,
  bukkasReducer,
  fetchUserAddress,
  fetchUserData,
  postUserAddress,
  postUserData,
  validateTokenReducer,
  requestPasswordChangesReducer,
  changePasswordReducer,
});

let middleware = applyMiddleware(thunk, logger);


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authenticationReducer']
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
