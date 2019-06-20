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
  // 只有当开启了模块热替换时 module.hot 才存在

  if (__DEV__ && module.hot) {
    // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
    // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
    module.hot.accept('../pages', () => {
      const nextRootReducer = require('../pages').default;
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default configureStore;
