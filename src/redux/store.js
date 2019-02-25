import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';  // eslint-disable-line
import thunk from 'redux-thunk';

import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
});

let middleware = applyMiddleware(thunk, logger);

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default createStore(reducer, middleware);
