import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { loadingReducer } from '../components/loading';
import userInfoReducer from '../reducers/user';
import menus from '../reducers/menus';
import loading from '../reducers/loading';

export const makeRootReducer = (asyncReducers) => {
  // use assign instead of ...asyncReducers
  const reducers = Object.assign(
    {
      routing: routerReducer,
      loading: loading,
      userInfo: userInfoReducer,
      menus: menus
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
