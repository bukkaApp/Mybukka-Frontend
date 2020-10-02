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

import signOutReducer from '../components/navbar/reducers/signOutReducer';
import searchAnythingReducer from './searchAnythingReducer';
import deliveryScheduleReducer from '../provider/Redux/deliveryScheduleReducer';
import cartReducer from '../provider/Redux/cartReducer';

import setDefaultCardReducer from '../features/checkout/reducers/setDefaultCardReducer';

import promotionReducer from '../features/promotion/reducer/promotionReducer';
import businessGroupReducer from '../provider/Redux/businessGroupReducer';
import activeOrderReducer from './../provider/Redux/ActiveorderReducer';

const reducer = combineReducers({
  loadingReducer,
  signOutReducer,
  changeAuthenticationPageReducer,
  deliveryModeReducer,
  businessesReducer,
  productsReducer,
  businessReducer,
  searchAnythingReducer,
  deliveryScheduleReducer,
  cartReducer,
  setDefaultCardReducer,
  promotionReducer,
  businessGroupReducer,
  activeOrderReducer,
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
    'activeOrderReducer',
  ],
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
