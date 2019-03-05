import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';

import homeReducer from 'Components/navbar/reducers';
import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

import deliveryModeReducer from
  '../components/common-navs/reducers/deliveryModeReducer';
import selectedLocationReducer from './selectedLocationReducer';

import locationsPredictionReducer from
  '../features/home/reducers/locationsPredictionReducer';

import bukkasReducer from '../features/feed/reducers/bukkasReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  homeReducer,
  deliveryModeReducer,
  locationsPredictionReducer,
  selectedLocationReducer,
  bukkasReducer,
});

let middleware = applyMiddleware(thunk, logger);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default createStore(reducer, middleware);
