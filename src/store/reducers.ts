import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// Add redux-ui to manage the app ui state
import { reducer as uiReducer } from 'redux-ui';

export const makeRootReducer = (asyncReducers) => {
  // use assign instead of ...asyncReducers
  const reducers = Object.assign(
    {
      routing: routerReducer,
      ui: uiReducer,
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
