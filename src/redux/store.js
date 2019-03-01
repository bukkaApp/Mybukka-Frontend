import { applyMiddleware, createStore, combineReducers } from 'redux';
// import logger from 'redux-logger';  // eslint-disable-line
import thunk from 'redux-thunk';

import homeReducer from 'Components/navbar/reducers';
import authenticationReducer from '../features/authentication/reducers';
import loadingReducer from './loadingReducer';

const reducer = combineReducers({
  loadingReducer,
  authenticationReducer,
  homeReducer
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

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
}

export default createStore(reducer, middleware);
