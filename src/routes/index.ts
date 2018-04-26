// We only need to import the modules necessary for initial render
import Layout from '../components/Layout';

import HomeRoute from './Home';
import CounterRoute from './Counter';
import Warehouse from './Warehouse';
import AccountingHelpHome from './accounting-help';
import QAS from './qas';
import Signin from './signin';
import { getUserInfo } from '../actions/user';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: Layout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    CounterRoute(store),
    Warehouse(store),
    AccountingHelpHome(store),
    QAS(store),
    // Signin(store)
  ],
  onEnter: (state, replace, cb) => {
    const { dispatch } = store;
    
    dispatch(getUserInfo()).then(() => {
      const { userInfo } = store.getState();
      const { isAuthenticated } = userInfo;

      if (!isAuthenticated) {
        replace(`/signin?from=${state.location.pathname}`);

        // 解决路由不跳转问题
        // https://github.com/ReactTraining/react-router/issues/3671
        cb();   
      }

      cb();
    });
  }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
