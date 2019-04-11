// We only need to import the modules necessary for initial render
import Page from '../components/page';

import CounterRoute from './Counter';
import Home from './Home';
import ProductList from './product-list';
import Dashboard from './dash-board';
import NotFound from './404';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
    path: '/',
    component: Page,
    indexRoute: Dashboard(store),
    childRoutes: [
      Dashboard(store),
      CounterRoute(store),
      ProductList(store),
      Dashboard(store),
      NotFound(store)
    ],
    // onEnter: (state, replace, cb) => {
    //     const { dispatch } = store;
    
    //     dispatch(getUserInfo()).then(() => {
    //         // const { userInfo } = store.getState();
    //         // const { isAuthenticated } = userInfo;

    //         const isAuthenticated = getCookie('aladdin-is-authenticated');

    //         // 如果用户认证通过，跳转到相应页面
    //         if (isAuthenticated) {
    //             // 解决路由不跳转问题
    //             // https://github.com/ReactTraining/react-router/issues/3671
    //             cb();
    //         }
    //     });
    // }
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
