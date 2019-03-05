import { applyMiddleware, createStore, combineReducers } from 'redux';
// import logger from 'redux-logger'; // eslint-disable-line
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

import profileReducer from '../features/profile/reducers';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  deliveryModeReducer,
  locationsPredictionReducer,
  selectedLocationReducer,
  homeReducer,
  profileReducer,
  bukkasReducer,
});

const logger = store => next => (action) => {
  const previous = JSON.stringify(store.getState());
  next(action);
  console.log(
    `action: ${JSON.stringify(action)
    }\n\tprevious: ${previous
    }\n\tcurrent: ${JSON.stringify(store.getState())}`
  );
};

let middleware = applyMiddleware(thunk, logger);


const persistConfig = {
  key: 'root',
  storage,
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
