///<reference path="./dev-types.d.ts"/>

import { createStore, applyMiddleware, compose } from 'redux';
const thunk = require('redux-thunk').default;
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import promiseMiddleware from '../middleware/promise-middleware';
import logger from './logger';
import makeRootReducer, { injectReducer } from './reducers';
const rooterReducer = makeRootReducer({});
function configureStore(initialState) {
  const store = compose(
    _getMiddleware()
  )(createStore)(rooterReducer, initialState);

  configReducer(store);

  _enableHotLoader(store);

  return store;
}

function _getMiddleware() {
  let middleware = [
    routerMiddleware(browserHistory),
    promiseMiddleware,
    thunk,
  ];

  if (__DEV__) {
    middleware = [...middleware, logger];
  }

  return applyMiddleware(...middleware);
}

/**
 * store Store
 */
function configReducer(store) {

  // split reducer
  store.asyncReducers = {};
  // add injectReducer to store,so we no need to import from sub routes anymore
  store.injectReducer = ({ key, reducer }) => {
    injectReducer(store, { key, reducer })
  };
}

function _enableHotLoader(store) {


  if (__DEV__ && module.hot) {
    module.hot.accept('../pages', () => {
      const nextRootReducer = require('../pages').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default configureStore;
