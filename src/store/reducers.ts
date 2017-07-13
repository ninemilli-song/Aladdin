import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// Add redux-ui to manage the app ui state
import { reducer as uiReducer } from 'redux-ui';
import { loadingReducer } from '../components/loading';
import { userInfoReducer } from '../components/global-info';

export const makeRootReducer = (asyncReducers) => {
  // use assign instead of ...asyncReducers
  const reducers = Object.assign(
    {
      routing: routerReducer,
      ui: uiReducer,
      loading: loadingReducer,
      userInfo: userInfoReducer,
    },
    asyncReducers,
  );
  return combineReducers(reducers)
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
