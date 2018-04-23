export default (store) => ({
    path: 'singin',
    /*  Async getComponent is only invoked when route matches   */
    getComponent(nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
            and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
                dependencies for bundling   */
            // These require calls are emitted (note these are NOT TypeScript
            // `import ... require` statements). `require.ensure` is defined in
            // require.d.ts. Webpack sees this and automatically puts c and d
            // into a separate chunk.
            const Container = require('./containers/Signin').default;
  
            // const reducer = require('./modules/modules').default;
  
            // store.injectReducer({
            //     key: 'QAS',
            //     reducer,
            // });
  
            /*  Return getComponent   */
            cb(null, Container);
  
            /* Webpack named bundle   */
        })
    }
  })
