import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
import changeAuthenticationPageReducer from 'Components/navbar/reducers/changeAuthenticationPageReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import checkoutModeReducer from 'Components/common-navs/reducers/checkoutModeReducer';
import reportIssueReducer from '../features/support/reducer/reportIssueReducer';
import authenticationReducer from '../provider/Redux/authenticationReducer';
import loadingReducer from '../provider/Redux/loadingReducer';

import deliveryModeReducer from '../components/common-navs/reducers/deliveryModeReducer';

import businessesReducer from '../provider/Redux/businessesReducer';
import userAddressReducer from '../provider/Redux/userAddressReducer';
import userProfileReducer from '../provider/Redux/userProfileReducer';
import updateUserAddressReducer from '../provider/Redux/updateUserAddressReducer';
import updateUserProfileReducer from '../provider/Redux/updateUserProfileReducer';
import displayTrackingReducer from '../features/history/reducers/displayTrackingReducer';
import getOrderHistoryReducer from '../features/history/reducers/getOrderHistoryReducer';
import validateTokenReducer from '../features/forgotPassword/reducers/validateTokenReducer';
import requestPasswordChangesReducer from '../features/forgotPassword/reducers/requestPasswordChangesReducer';
import changePasswordReducer from '../features/forgotPassword/reducers/changePasswordReducer';
import businessReducer from '../provider/Redux/businessReducer';

import productsReducer from '../provider/Redux/productsReducer';

import manipulateCardDetailsReducer from '../features/checkout/reducers/manipulateCardDetailsReducer';

import chargeUserReducer from '../features/checkout/reducers/chargeUserReducer';

import finishTransactionReducer from '../features/checkout/reducers/finishTransactionReducer';
import signOutReducer from '../components/navbar/reducers/signOutReducer';
import searchAnythingReducer from './searchAnythingReducer';
import deliveryScheduleReducer from '../provider/Redux/deliveryScheduleReducer';
import cartReducer from '../provider/Redux/cartReducer';

import verifyCardReducer from '../features/checkout/reducers/verifyCardReducer';
import saveUserCardReducer from '../features/checkout/reducers/saveUserCardReducer';
import getUserCardReducer from '../features/checkout/reducers/getUserCardReducer';
import setDefaultCardReducer from '../features/checkout/reducers/setDefaultCardReducer';

import sendContactReducer from '../provider/Redux/sendContactReducer';
import sendVerificationCodeReducer from '../provider/Redux/sendVerificationCodeReducer';

import promotionReducer from '../features/promotion/reducer/promotionReducer';
import businessGroupReducer from '../provider/Redux/businessGroupReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  signOutReducer,
  changeAuthenticationPageReducer,
  deliveryModeReducer,
  businessesReducer,
  userAddressReducer,
  userProfileReducer,
  updateUserAddressReducer,
  updateUserProfileReducer,
  displayTrackingReducer,
  getOrderHistoryReducer,
  validateTokenReducer,
  requestPasswordChangesReducer,
  changePasswordReducer,
  productsReducer,
  businessReducer,
  manipulateCardDetailsReducer,
  chargeUserReducer,
  finishTransactionReducer,
  checkoutModeReducer,
  searchAnythingReducer,
  deliveryScheduleReducer,
  cartReducer,
  reportIssueReducer,
  sendContactReducer,
  sendVerificationCodeReducer,
  saveUserCardReducer,
  verifyCardReducer,
  getUserCardReducer,
  setDefaultCardReducer,
  promotionReducer,
  businessGroupReducer,
});

let middleware = applyMiddleware(thunk, logger);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'authenticationReducer',
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
