import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger'; // eslint-disable-line
import thunk from 'redux-thunk';

import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';
import deliveryModeReducer from
  '../components/common-navs/reducers/deliveryModeReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  deliveryModeReducer
});

let middleware = applyMiddleware(thunk, logger);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default createStore(reducer, middleware);
