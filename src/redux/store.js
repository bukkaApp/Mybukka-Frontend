import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
import changeAuthenticationPageReducer from 'Components/navbar/reducers/changeAuthenticationPageReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loadingReducer from '../provider/Redux/loadingReducer';

import deliveryModeReducer from '../components/common-navs/reducers/deliveryModeReducer';

import businessesReducer from '../provider/Redux/businessesReducer';
import businessReducer from '../provider/Redux/businessReducer';

import productsReducer from '../provider/Redux/productsReducer';

import manipulateCardDetailsReducer from '../features/checkout/reducers/manipulateCardDetailsReducer';

import chargeUserReducer from '../features/checkout/reducers/chargeUserReducer';

import finishTransactionReducer from '../features/checkout/reducers/finishTransactionReducer';
import signOutReducer from '../components/navbar/reducers/signOutReducer';
import searchAnythingReducer from './searchAnythingReducer';
import deliveryScheduleReducer from '../provider/Redux/deliveryScheduleReducer';
import cartReducer from '../provider/Redux/cartReducer';

import setDefaultCardReducer from '../features/checkout/reducers/setDefaultCardReducer';

import promotionReducer from '../features/promotion/reducer/promotionReducer';
import businessGroupReducer from '../provider/Redux/businessGroupReducer';

const reducer = combineReducers({
  loadingReducer,
  signOutReducer,
  changeAuthenticationPageReducer,
  deliveryModeReducer,
  businessesReducer,
  productsReducer,
  businessReducer,
  manipulateCardDetailsReducer,
  chargeUserReducer,
  finishTransactionReducer,
  searchAnythingReducer,
  deliveryScheduleReducer,
  cartReducer,
  setDefaultCardReducer,
  promotionReducer,
  businessGroupReducer,
});

let middleware = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    // 'businessReducer',
    // 'productsReducer',
    'businessGroupReducer',
    'promotionReducer',
    'deliveryScheduleReducer',
    'cartReducer',
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
