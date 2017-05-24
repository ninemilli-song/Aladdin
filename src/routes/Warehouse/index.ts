/**
 * 仓库入口文件
 */
export default (store) => ({
    path: 'warehouse',
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

            const Warehouse = require('./containers').default;

            const reducer = require('./modules').default;

            store.injectReducer({
                key: 'warehouse',
                reducer,
            });

            /*  Return getComponent   */
            cb(null, Warehouse);

            /* Webpack named bundle   */
        })
    }
})
